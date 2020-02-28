## Uploading Documents

You can upload documents via the storage method that you chose.
Currently, our storage is implemented with AWS S3. We may be able to accomodate to other storage providers at your request.

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
var docID string // set docID of your file here
var dataStream io.Reader
var err error

dataStream, err := DownloadDocumentStream(token, docID)
buf := make([]byte, 1000)
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