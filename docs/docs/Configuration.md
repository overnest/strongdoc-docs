## Configuration

Configuration simply returns the current configuration of the server
as a string.

```go
config, err := GetConfiguration(token)
if err != nil {
    log.Printf("failed to get Configuration: %s", err)
    os.Exit(1)
}
fmt.Printf("Configuration recieved: %s", config)
```