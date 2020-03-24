import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Encryption

Strongdoc offers an encryption service. No data is stored on Strongdoc. 

> We also do provide a store-and-encrypt service with [`UploadDocument`](Storage.md#upload-document) and  [`UploadDocumentStream`](Storage.md#upload-document-streaming).

### Encrypt Document

To encrypt a document, simply call it together with the filename and the payload.

<Tabs
  defaultValue="go"
  values={[
      {label: 'Go', value: 'go'},
      {label: 'NodeJS', value: 'node'},
      {label: 'Java', value: 'java'},
      {label: 'Python', value: 'py'},
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
# set filename(string)
with open(filename) as f:
        file_bytes = f.read()
doc_id, ciphertext = document.encrypt_document(token, filename, file_bytes)
```

</TabItem>
<TabItem value="node">

```javascript
const fs = require('fs');
const { documents } = require('strongdoc-nodejs-sdk')

const data = fs.readFileSync('./path-to-my-file/myFile');

resp = await document.encryptDocument(client, 'myfilename.pdf', data);
const docId = resp.getDocID();
const encrypted = resp.getCiphertext();
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.responses.*;

// Set the filename
final String filename;
// Set the text to be encrypted
final String plaintext;

final StrongDocDocument document = new StrongDocDocument();
final EncryptDocumentResponse encryptDocResponse = document.encryptDocument(
    client, token, filename, plaintext.getBytes());
final String docID = encryptDocResponse.getDocID();
final byte[] ciphertext = encryptDocResponse.getCiphertext();
```
</TabItem>
</Tabs>


> Storage of your (encrypted) documents is also available with [`UploadDocument`](Storage.md#upload-document).

### Encrypt Document (Streaming)

The encryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly.

<Tabs
  defaultValue="go"
  values={[
      {label: 'Go', value: 'go'},
      {label: 'NodeJS', value: 'node'},
      {label: 'Java', value: 'java'},
      {label: 'Python', value: 'py'},
    ]}
>
<TabItem value="go">
 You must provide an io.Reader object (for instance, an os.File).

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

</TabItem>
<TabItem value="py">
You must provide an generator function that yields the data of the file.

`EncryptDocumentStream` returns a generator function yielding the ciphertext.

```py
def file_chunker(f, chunkSize=10000):
    while True:
        data = f.read(chunkSize)
        if not data:
            break
        yield data

file_bytes_generator = file_chunker(open(filepath))

doc_id, ciphertext_generator = document.encrypt_document_strea(token, filename, file_bytes_generator
ciphertext = extract_generator(ciphertext_generator)

print(doc_id)

```

</TabItem>
<TabItem value="node">

You must provide a Readable stream that yields the data of the file.

`EncryptDocumentStream` returns a Readable stream of the ciphertext.

```javascript
const { document } = require('strongdoc-nodejs-sdk');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

const readStream = fs.createReadStream('./path/file');
const response = await document.encryptDocumentStream(client, 'file name', readStream);

// You can iterate throught the stream
for await (const chunk of response.encryptStream) {
    //do something with the chunk
}

// or pipe the stream to a writable
const writable = fs.createWriteStream('./path/encryptedFile');
await pipeline(response.encryptStream, writable);
//async
response.encryptStream.pipe(writable)
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.responses.*;

// Set the filename
final String filename;
// Set the text to be encrypted
final String plaintext;

final StrongDocDocument document = new StrongDocDocument();
InputStream inputData = new ByteArrayInputStream(plaintext.getBytes());
EncryptDocumentResponse encryptDocResponse = document.encryptDocumentStream(
    client, token, filename, inputData);
final String docID = encryptDocResponse.getDocID();
final byte[] ciphertext = encryptDocResponse.getCiphertext();
```
</TabItem>
</Tabs>

> We are also able to encrypt and store the documents for you with [`UploadDocumentStream`](Storage.md#upload-document-streaming).

## Decryption

After encryption, you may now decrypt the document.

### Decrypt Document

To decrypt a document, simply call it together with the filename and the payload.

<Tabs
  defaultValue="go"
  values={[
      {label: 'Go', value: 'go'},
      {label: 'NodeJS', value: 'node'},
      {label: 'Java', value: 'java'},
      {label: 'Python', value: 'py'},
    ]}
>
<TabItem value="go">

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

</TabItem>
<TabItem value="py">

```py
# set doc_id(string)
decrypted_bytes = document.decrypt_document(token, doc_id, ciphertext)
```

</TabItem>
<TabItem value="node">

```javascript
const fs = require('fs');

const ciphertext = fs.readFileSync('./path/encryptedFile');

const data = await document.decryptDocument(client, docId, ciphertext);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;
// Load the ciphertext from the document
final byte[] ciphertext;

final StrongDocDocument document = new StrongDocDocument();
byte[] decryptedData = document.decryptDocument(client, token, docID, ciphertext);
```
</TabItem>
</Tabs>


### Decrypt Document (Streaming)

The decryption API is also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly. 

<Tabs
  defaultValue="go"
  values={[
      {label: 'Go', value: 'go'},
      {label: 'NodeJS', value: 'node'},
      {label: 'Java', value: 'java'},
      {label: 'Python', value: 'py'},
    ]}
>
<TabItem value="go">

You must provide an `io.Reader` object yielding the ciphertext returned by one of the encryption methods, `EncryptDocument` or `EncryptDocumentStream`.

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

</TabItem>
<TabItem value="py">
You must provide an generator function that yields the data of the file. 

decryptDocumentStream returns a generator function yielding the plaintext.

```py
# set filename(string) and ciphertext_generator, which yields the data of the file
plaintext_generator = document.decrypt_document_stream(token, filename, ciphertext_generator)
plaintext = b''
for chunk in plaintext_generator:
    plaintext += chunk
```

</TabItem>
<TabItem value="node">

You must provide a Readable stream that yields the data of the file.

decryptDocumentStream returns a Readable stream yielding the plaintext.

```javascript

const decryptStream = await document.decryptDocumentStream(client, docId, readableStream);

//iterate
for await (const chunk of decryptStream) {
    //do something with chunk
}

//or pipe
decryptStream.pipe(writable)
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;
// Set the text to be decrypted
final byte[] ciphertext;

final StrongDocDocument document = new StrongDocDocument();
InputStream encryptedStream = new ByteArrayInputStream(ciphertext);
byte[] decryptedBytes = document.decryptDocumentStream(client, token, docID, encryptedStream);
```
</TabItem>
</Tabs>

