## Uploading Documents

With our storage service permits you to securely encrypt and store your documents with Strongdoc.

### Upload Document

To upload documents, pass the raw bytes into the function together
with a key (a string that uniquely identifies the document). The payload 
can be any arbitrary bytes. In this case, the bytes are obtained 
from a file located locally in the same directory as the Go
program being executed.

```go
var filename string // set your filename here
var fileBytes []byte
var err error
var docID string

fileBytes, err = ioutil.ReadFile(filename)
docID, err = api.UploadDocument(token, filename, fileBytes)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]", docID)
```

### Upload Document (Streaming)

You may also stream the document, which you may want if your file is too big or if you want to stream the bytes on the fly. You must provide an io.Reader object (for instance, an os.File).

```go
var filename string // set your filename here
var fileBytes []byte
var err error

docID, err := api.UploadDocumentStream(token, filename, fileBytes)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]\n", docID)
```

## Downloading Documents

To download the documents, you should keep track of the documents
which you have uploaded. You must provide the DocID of the uploaded
document.

### Download Document

The file is returned as a byte slice containing the plaintext of the document.

```go
var docID string // use docID for the file you want
var rcvdBytes []byte
var err error

rcvdBytes, err = api.DownloadDocument(token, docID)
if err != nil {
    log.Printf("Can not download document: %v", err)
    os.Exit(1)
}
fmt.Printf("Received file, bytes: [%v]\n", rcvdBytes)
```

### Download Document (Streaming)

The file download also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly.

`DownloadDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, your document is 'lazily' decrypted via Strongsalt encrytion and downloaded, and the plaintext filling the buffer provided.

```go
const blockSize = 1000

var docID string // set docID of your file here
var dataStream io.Reader
var err error

dataStream, err := DownloadDocumentStream(token, docID)
buf := make([]byte, blockSize)
rcvdBytes := make([]byte,0)
for err == nil {
    n, readErr := dataStream.Read(buf)
    if err != nil && err != io.EOF {
        log.Printf("Can not download document: %v", err)
        os.Exit(1)
    }
    err = readErr
    rcvdBytes = append(rcvdBytes, buf[:n]...)
}
fmt.Printf("Received file, bytes: [%v]\n", rcvdBytes)
```

## List Document

This function allows you to list the documents that you can access. The return object is an array of `Document`. This object has three properties, `DocName`, `DocID` and `Size`.

```go
docs, err := ListDocuments(token)
if err != nil {
    log.Printf("err with ListDocuments: %s", err)
    return
}

for i, doc := range docs {
    fmt.Printf("%d | DocName: [%s], DocID: [%s], Size: [%d]\n--------\n", i, doc.DocName, doc.DocID, doc.Size)
}
```

# Get Document Size and Get Index Size

<!-- This function allows you to check the size of your documents and index. 

```go
docs, err := api.GetDocumentsSize(token)
if err != nil {
    log.Printf("err with ListDocuments: %s", err)
    return
}
fmt.Printf("The total size of your documents is %d")
``` -->

> Not implemented yet.


## Remove Document

`Remove Document` deletes a document that you can access.

If you are a regular user, you may only remove a document that belongs to you. If you are an administrator, you can remove all the documents of the organization for which you are an administrator.

Attempting to remove a nonexistent document throws an error.

```go
var docID string // set docID of the document here

err := RemoveDocument(token, docID)
if err != nil {
    log.Printf("err with RemoveDocument: %s", err)
    return
}
```
