## Sharing Documents

You may share your documents with another organization here.
They will now be able to do anything that you can. It's important
that you only share documents with users that you trust.

```Go
ok, err := ShareDocument(token, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not share: %v", err)
    return
}
```