# kong-ui

A simple UI to access Kong Admin API.

## Usage

### Run with the prebuilt binary

Download the binary for your platform and make it executable, run the following command to launch the server:

```bash
./kong-ui_amd64-darwin -t http://your_kong_admin_endpoint
```

Open http://localhost:7080 to explore the UI and Kong APIs. The default listening port is `7080`, while it can be changed with the option `-l`, e.g `-l :9909`.


### Run from source code

nodejs and golang are required to build the project.

```bash
npm install
npm build
go run main.go -t http://your_kong_admin_endpoint -l :9909
```

## Development

1. Prepare the local Kong instance for the first run:

```
docker compose up db -d
docker compose run --rm kong kong migrations bootstrap
```

2. Start the Kong instance

```
docker compose up
```
