## Encryption

Strongdoc offers an encryption service. No data is stored on Strongdoc. 

> We also do provide a store-and-encrypt service with [`UploadDocument`](Storage.md#upload-document) and  [`UploadDocumentStream`](Storage.md#upload-document-streaming).

### Encrypt Document

To encrypt a document, simply call it together with the filename and the payload.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="go"
  values={[
      {label: 'Go Lang', value: 'go'},
      {label: 'Python', value: 'py'}
    ]}
>
<TabItem value="go">

```go
var filename string // set your filename here
var fileBytes []byte
var err error
var ciphertext string

fileBytes, err = ioutil.ReadFile(filename)
docID, ciphertext, err := api.EncryptDocument(token, filename, fileBytes)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    os.Exit(1)
}
fmt.Printf("Encrypted file, docID: [%s]", docID)
```

</TabItem>
<TabItem value="py">

```py
print('Hello, world')
```

</TabItem>
</Tabs>

> Storage of your (encrypted) documents is also available with [`UploadDocument`](Storage.md#upload-document).

### Encrypt Document (Streaming)

The encryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly. You must provide an io.Reader object (for instance, an os.File).

`EncryptDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, your document is 'lazily' encrypted via Strongsalt encrytion, and the encrypted data filling the buffer provided. 

```go
import "github.com/strongdoc/client/go/api"

var filename string // set your filename here
var err error
var fileBytes []byte
var cipherStream io.Reader
var docID string

fileBytes, err = ioutil.ReadFile(filename)
cipherStream, docID, err := api.EncryptDocumentStream(token, filename, fileBytes)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    os.Exit(1)
}
buf := make([]byte, 1000)
ciphertext := make([]byte, 0)
for err != io.EOF {
    n, readErr := eds.Read(buf)
    err = readErr
    ciphertext = append(ciphertext, buf[:n]...)
}
fmt.Printf("Encrypted file, docID: [%s]", docID)
```

> We are also able to encrypt and store the documents for you with [`UploadDocumentStream`](Storage.md#upload-document-streaming).

## Decryption

After encryption, you may now decrypt the document.

### Decrypt Document

To decrypt a document, simply call it together with the filename and the payload.

```go
import "github.com/strongdoc/client/go/api"

var docID string // set docID of your file here
var err error
var ciphertext []byte // load ciphertext of your document here
var cipherStream io.Reader
var plaintext []byte

plaintext, err = DecryptDocument(token, docID, ciphertext)
if err != nil {
    log.Printf("Can not decrypt document: %s", err)
    os.Exit(1)
}
fmt.Printf("Received file, bytes: [%v]", plaintext)
```

### Decrypt Document (Streaming)

The decryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly. You must provide an `io.Reader` object yielding the ciphertext returned by one of the encryption methods, `EncryptDocument` or `EncryptDocumentStream`.

`DecryptDocumentStream` returns an `io.Reader` stream.

When `Read()` is called on the stream, the ciphertext is 'lazily' decrypted via Strongsalt encrytion, and the plaintext filling the buffer provided. 

```go
const blockSize = 1000

var docID string // set docID of your file here
var cipherStream io.Reader // set ciphertext of your document here
var err error
var plaintext []byte

plainStream, err := api.DecryptDocumentStream(token, docID, cipherStream)
if err != nil {
    log.Printf("Can not decrypt document: %s", err)
    os.Exit(1)
}

buf := make([]byte, blockSize)
plaintext := make([]byte, 0)
for err != io.EOF {
    n, readErr := plainStream.Read(buf)
    if err != nil && err != io.EOF {
        log.Printf("Can not download document: %v", err)
        os.Exit(1)
    }
    err = readErr
    plaintext = append(plaintext, buf[:n]...)
}
fmt.Printf("Received file, bytes: [%v]", plaintext)
```

