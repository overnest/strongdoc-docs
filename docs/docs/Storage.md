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
import (
    "github.com/strongdoc/client/go/api"
    "io/ioutil"
)

token, _ := api.Login(adminID, adminPassword, orgID)
fileName := "CompanyIntro.txt"
docBytes, _ := ioutil.ReadFile(filename)
docKey := fileName
uploadDocID, err := api.UploadDocument(token, documentKey, docBytes)
if err != nil {
    log.Printf("Can not upload document: %s", err)
    os.Exit(1)
}
```

### Upload Document (Streaming)

You may also stream the document, which you may want if your file is too big or if you want to stream the bytes on the fly. You must provide an io.Reader object (for instance, an Os.File).

```go
import (
    "github.com/strongdoc/client/go/api"
)

uploadDocID, err := api.UploadDocumentStream(token, "myfile.pdf", pdfFile)
if err != nil {
    log.Printf("Can not upload document: %s", err)
    os.Exit(1)
}
```

## Downloading Documents

To download the documents, you should keep track of the documents
which you have uploaded. You must provide the DocID of the uploaded
document.

### Download Document

The file is returned as a byte slice containing the plaintext of the document.

```go
fileBytes, err := api.DownloadDocument(token, uploadDocID)
fmt.Printf("%v", downBytes)
if err != nil {
    log.Printf("Can not download document: %s", err)
    return
}
```

### Download Document (Streaming)

The file download also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly.

`DownloadDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, your document is 'lazily' decrypted via Strongsalt encrytion and downloaded, and the plaintext filling the buffer provided.

```go
plainStream, err := DownloadDocumentStream(token, uploadDocID)
buf := make([]byte, 1000)
plaintext := make([]byte,0)
for err == nil {
    n, readErr := s.Read(buf)
    err = readErr
    downDocBytes = append(downDocBytes, buf[:n]...)
}
```