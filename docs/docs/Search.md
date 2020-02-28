## Searching Documents

Search amongst the documents you have with search.

The document ID and its associated score is returned. The higher the score, the stronger the match of the document with the query sent.

```go
results, err := Search(token, "bed")
if err != nil {
    log.Printf("search failed: %s", err)
    return
}
for _, res := range results {
    fmt.Printf("docID: %s, score: %f\n", res.DocID, res.Score)
}
```
