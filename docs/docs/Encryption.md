import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Encryption

Strongdoc offers an encryption service. No data is stored on Strongdoc. 

> We also do provide a store-and-encrypt service with [`UploadDocument`](Storage.md#upload-document) and  [`UploadDocumentStream`](Storage.md#upload-document-streaming).

### Encrypt Document

The non-streaming version sends the entire plain text to the service, and receives the entire cipher text back. This assumes there is enough memory to store the entire contents of the file in memory.

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

// Read the entire file into a byte slice
fileBytes, err = ioutil.ReadFile(filename)
docID, ciphertext, err := api.EncryptDocument(filename, fileBytes)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    os.Exit(1)
}
fmt.Printf("Encrypted file, docID: [%s]", docID)
```

</TabItem>
<TabItem value="py">

To encrypt data it must be of type `bytes`, or a readable subclass of `io.BufferedIOBase` which the data can be streamed from.

```py
from strongdoc.api import document

# Get bytes somehow, such as like this:
my_bytes = b'some data'

# Or:
my_bytes = bytes('some string', 'utf-8')

# Or:
with open('path/to/file', 'rb') as f:
    my_bytes = f.read()

# login to get a token

# Then encrypt the data:
docid, ciphertext = document.encrypt_document(token, doc_name, my_bytes)
```
The docID is needed to decrypt the ciphertext.

For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.encrypt_document).
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
// Please follow the 'Getting Started' section example on how to create the 'client'.
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
var plaintextFileName string  // set your filename here
var ciphertextFileName string // set your filename here

plainTextFile, err := os.Open(plaintextFileName)
if err != nil {
    log.Printf("Can not open file: %s", err)
    os.Exit(1)
}
defer plainTextFile.Close()

cipherTextStream, docID, err := api.EncryptDocumentStream(plaintextFileName, plainTextFile)
if err != nil {
    log.Printf("Can not encrypt document: %s", err)
    os.Exit(1)
}

cipherTextFile, err := os.Create(ciphertextFileName)
if err != nil {
    log.Printf("Can not open file: %s", err)
    os.Exit(1)
}
defer cipherTextFile.Close()

_, err := io.Copy(cipherTextFile, cipherTextStream)
if err != nil {
    log.Printf("Can not copy stream: %s", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

This will stream the ciphertext to a writable subclass of `io.BufferedIOBase`, such as a file opened in `wb` mode. It can also read the plaintext from a readable subclass of `io.BufferedIOBase`, such as a file opened in `rb` mode. Otherwise you can supply the plaintext data as type `bytes`.

```py
from strongdoc.api import document

# login and get a token

with open('path/to/output_file', 'wb') as output_file:
    with open('path/to/plaintext_file', 'rb') as plaintext:
        docid = document.encrypt_document_stream(token, doc_name, plaintext, output_file)

```
The docID is needed to decrypt the ciphertext.

For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.encrypt_document_stream).
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
// Please follow the 'Getting Started' section example on how to create the 'client'.
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
var plaintext []byte

plaintext, err = DecryptDocument(docID, ciphertext)
if err != nil {
    log.Printf("Can not decrypt document: %s", err)
    os.Exit(1)
}
fmt.Printf("Received file, bytes: [%v]", plaintext)
```

</TabItem>
<TabItem value="py">

This will decrypt the ciphertext returned from an encrypt function call, and return the plaintext as type `bytes`. The ciphertext can be type `bytes` as returned by `encrypt_document` or a readable subclass of `io.BufferedIOBase`.

```py
from strongdoc.api import document

# login and get a token

# encrypt a document and save the docid and the ciphertext

decrypted_bytes = document.decrypt_document(token, docid, ciphertext)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.decrypt_document).

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
// Please follow the 'Getting Started' section example on how to create the 'client'.
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

plainStream, err := api.DecryptDocumentStream(docID, cipherStream)
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

This will decrypt ciphertext from an encrypt function call and write the plaintext to a writable subclass of `io.BufferedIOBase`, such as a file opened in `wb` mode. The ciphertext can be of type `bytes` as returned by `encrypt_document`, or a readable subclass of `io.BufferedIOBase`, such as a file opened in `rb` mode.

```py
from strongdoc.api import document

# save the docid and ciphertext from an encrypt function call

# login and get a token

with open('path/to/output_file', 'wb') as output_file:
    with open('path/to/ciphertext_file', 'rb') as ciphertext:
        document.decrypt_document_stream(token, docid, ciphertext, output_file)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.decrypt_document_stream).

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
// Please follow the 'Getting Started' section example on how to create the 'client'.
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

