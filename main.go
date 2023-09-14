package main

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"

	"github.com/jessevdk/go-flags"
)

//go:embed dist/*
var staticFS embed.FS

func mustFS() (http.FileSystem, error) {
	sub, err := fs.Sub(staticFS, "dist")

	if err != nil {
		return nil, err
	}

	return http.FS(sub), nil
}
func NewProxy(targetHost string) (*httputil.ReverseProxy, error) {
	url, err := url.Parse(targetHost)
	if err != nil {
		return nil, err
	}

	return httputil.NewSingleHostReverseProxy(url), nil
}

type Options struct {
	Target string `short:"t" long:"target" description:"target host" required:"true"`
	Listen string `short:"l" long:"l" description:"listening port" default:":7080"`
}

func NewHandler(opts Options, proxy *httputil.ReverseProxy, fileHanlder http.Handler) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		accept := r.Header.Get("Accept")
		isHTMLRequest := strings.Contains(accept, "text/html")

		path := r.URL.Path

		fmt.Println(path)

		if path == "/" {
			w.Header().Add("Location", "/ui/")
			w.WriteHeader(302)
		} else if strings.HasPrefix(path, "/ui") {
			path = strings.TrimLeft(path, "/ui")
			if isHTMLRequest {
				r.URL.Path = "/"
			} else {
				r.URL.Path = path
			}
			fileHanlder.ServeHTTP(w, r)
		} else {
			proxy.ServeHTTP(w, r)
		}
	}
}

func createMux(opts *Options) (*http.ServeMux, error) {

	// setup proxy
	proxy, err := NewProxy(opts.Target)
	if err != nil {
		return nil, err
	}

	fs, err := mustFS()
	if err != nil {
		return nil, err
	}

	fileHandler := http.FileServer(fs)

	mux := http.NewServeMux()
	mux.Handle("/", NewHandler(*opts, proxy, fileHandler))

	return mux, nil
}

func main() {
	opts := Options{}
	_, err := flags.ParseArgs(&opts, os.Args)
	if err != nil {
		log.Fatalln(err)
	}

	mux, err := createMux(&opts)
	if err != nil {
		log.Fatalln(err)
	}

	if err := http.ListenAndServe(opts.Listen, mux); err != nil {
		log.Fatalln(err)
	}
}
