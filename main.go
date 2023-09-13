package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
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

func ProxyRequestHandler(proxy *httputil.ReverseProxy) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	}
}

type Options struct {
	Host string `short:"t" long:"target" description:"target host" required:"true"`
}

func invoke(opts *Options) error {
	// setup proxy
	proxy, err := NewProxy(opts.Host)
	if err != nil {
		log.Fatalln(err)
	}
	http.HandleFunc("/", ProxyRequestHandler(proxy))
	go func() {
		if err := http.ListenAndServe(":7081", nil); err != nil {
			log.Fatalln(err)
		}
	}()

	// setup local server
	router := gin.Default()

	// Fallback HTML request to dist/index.html
	router.Use(func(c *gin.Context) {
		c.Next()
		isHTMLRequest := strings.Contains(c.Request.Header.Get("Accept"), "text/html")
		if c.Writer.Status() == 404 && isHTMLRequest {
			indexFile, _ := staticFS.ReadFile("dist/index.html")
			_, _ = c.Writer.Write(indexFile)
			c.Status(200)
		}
	})

	if fs, err := mustFS(); err != nil {

	} else {
		router.StaticFS("/", fs)
	}

	if err := router.Run(":7080"); err != nil {
		return err
	}
	return nil
}

func main() {
	opts := Options{}
	_, err := flags.ParseArgs(&opts, os.Args)
	if err != nil {
		log.Fatalln(err)
	}

	if err := invoke(&opts); err != nil {
		log.Fatalln(err)
	}
}
