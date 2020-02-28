## Searching Documents

Search amongst the documents you have with search.

The document ID and its associated score is returned.
The score represents <!-- todo -->.

```go
hits, err := api.Search(token, "security")
if err != nil {
    log.Printf("Can not search documents: %s", err)
    return
}
```
