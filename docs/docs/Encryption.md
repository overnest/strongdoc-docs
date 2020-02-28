## Encryption

Strongdoc offers an encryption service. No data is stored on Strongdoc. We provide storage via commonly available online storage (eg. AWS S3) with `UploadDocument` and `UploadDocumentStream`.

### Encrypt Document

To encrypt a document, simply call it together with the filename and the payload.

```go
import "github.com/strongdoc/client/go/api"

encryptDocID, ciphertext, err := api.EncryptDocument(token, "myfile.pdf", pdfBytes)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    return
}
```

> We are also able to store your documents while ensuring that they're encrypted, with `UploadDocument`.

### Encrypt Document (Streaming)

The encryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly. You must provide an io.Reader object (for instance, an Os.File).

`EncryptDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, your document is 'lazily' encrypted via Strongsalt encrytion, and the encrypted data filling the buffer provided. 

```go
import "github.com/strongdoc/client/go/api"

cipherStream, docID, err := api.EncryptDocumentStream(token, "myfile.pdf", pdfFile)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    return
}
buf := make([]byte, 1000)
ciphertext := make([]byte, 0)
for err != io.EOF {
    n, readErr := eds.Read(buf)
    err = readErr
    ciphertext = append(ciphertext, buf[:n]...)
}
```

> We are also able to store your documents while ensuring that they're encrypted, implemented as a streaming protocol, with `UploadDocumentStream`.

## Decryption

After encryption, you may now decrypt the document.

### Decrypt Document

To decrypt a document, simply call it together with the filename and the payload.

```go
import "github.com/strongdoc/client/go/api"

decryptedBytes, err := DecryptDocument(token, docID, ciphertext)
if err != nil {
    log.Printf("Can not decrypt document: %s", err)
    return
}
```

### Decrypt Document (Streaming)

The decryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly. You must provide an `io.Reader` object yielding the ciphertext returned by one of the encryption methods, `EncryptDocument` or `EncryptDocumentStream`.

`DecryptDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, the ciphertext is 'lazily' decrypted via Strongsalt encrytion, and the plaintext filling the buffer provided. 

```go
import "github.com/strongdoc/client/go/api"

plainStream, err := api.DecryptDocumentStream(token, docID, cipherStream)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    return
}
buf := make([]byte, 1000)
ciphertext := make([]byte, 0)
for err != io.EOF {
    n, readErr := eds.Read(buf)
    err = readErr
    ciphertext = append(ciphertext, buf[:n]...)
}
```


