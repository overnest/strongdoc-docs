import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Uploading Documents

With our storage service permits you to securely encrypt and store your documents with Strongdoc.

### Upload Document

To upload documents, pass the raw bytes into the function together
with a key (a string that uniquely identifies the document). The payload 
can be any arbitrary bytes. In this case, the bytes are obtained 
from a file located locally in the same directory as the Go
program being executed.
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
var docID string

fileBytes, err = ioutil.ReadFile(filename)
docID, err = api.UploadDocument(token, filename, fileBytes)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]", docID)
```

</TabItem>
<TabItem value="py">

```py
# set filepath, and filename here
with open(filepath, "rb") as f:
    file_bytes = f.read()
doc_id = document.upload_document(token, filename, file_bytes)
```

</TabItem>
<TabItem value="node">

```javascript
const fs = require('fs');

let docName // set value here
let plaintext = fs.readFileSync(filepath);

resp = await document.uploadDocument(client, docName, plaintext);
docId = resp.getDocID();
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the filename
final String filename;
// Create a File
File file = new File("path_to_file/" + filename);

final StrongDocDocument document = new StrongDocDocument();
final byte[] data = Files.readAllBytes(file.toPath());
final String docID = document.uploadDocument(client, token, filename, data);
```
</TabItem>
</Tabs>

### Upload Document (Streaming)

You may also stream the document, which you may want if your file is too big or if you want to stream the bytes on the fly.

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
var fileReader io.Reader // provide an io.Reader object (for instance, an os.File)
var err error

docID, err := api.UploadDocumentStream(token, filename, fileReader)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]\n", docID)
```
</TabItem>
<TabItem value="py">

You must provide an generator function that yields the data of the file.

```py
def file_chunker(f, chunkSize=10000):
    while True:
        data = f.read(chunkSize)
        if not data:
            break
        yield data

file_bytes_generator = file_chunker(open(filepath))

doc_id = document.upload_document_stream(token, filename, file_bytes_generator)
```

</TabItem>
<TabItem value="node">

```javascript
// set docName of your document here

let readStream = fs.createReadStream(filepath);
let response = await document.uploadDocumentStream(client, docName, readStream);
console.log("uploadDocumentStream: " + response.getDocID());
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
// Create a File
File file = new File("path_to_file/" + filename);

final StrongDocDocument document = new StrongDocDocument();
final UploadDocumentResponse uploadDocumentResponse = document.uploadDocumentStream(
    client, token, filename, new FileInputStream(file));

// The uploaded document ID and size
final String docID = uploadDocumentResponse.getDocID();
final int docSize = uploadDocumentResponse.getNumBytes();
```
</TabItem>
</Tabs>


## Downloading Documents

To download the documents, you should keep track of the documents
which you have uploaded. You must provide the DocID of the uploaded
document.

### Download Document

The file is returned as a byte slice containing the plaintext of the document.

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

</TabItem>
<TabItem value="py">

```py
down_bytes = document.download_document_stream(token, doc_id)
```

</TabItem>
<TabItem value="node">

```javascript
let docId // set value here

plaintext = await document.downloadDocument(client, docId);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;

final StrongDocDocument document = new StrongDocDocument();
final byte[] plaintext = document.downloadDocument(client, token, docID);
```
</TabItem>
</Tabs>


### Download Document (Streaming)

The file download also offered as a streaming service, which you may want to do if your file is too big or if you want to stream the bytes on the fly.

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

</TabItem>
<TabItem value="py">

You must provide an generator function that yields the data of the file. 

`downloadDocumentStream` returns a generator yielding the downloaded document.

```py
down_bytes = b''
down_chunk_gen = document.download_document_stream(token, upload_docid)
for chunk in down_chunk_gen:
    down_bytes += chunk
```

</TabItem>
<TabItem value="node">
You must provide a Readable stream that yields the data of the file.

downloadDocumentStream returns a Readable stream yielding the plaintext.

```javascript
let downStream = document.downloadDocumentStream(client, docID);
let downPlaintext = Buffer.alloc(0);
for await (let chunk of downStream) {
    downPlaintext = Buffer.concat([downPlaintext, chunk])
}
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;
// The stream to where the downloaded document will be written to
ByteArrayOutputStream output = new ByteArrayOutputStream();

final StrongDocDocument document = new StrongDocDocument();
document.downloadDocumentStream(client, token, docID, output);
```
</TabItem>
</Tabs>

## List Document

This function allows you to list the documents that you can access. The return object is an array of `Document`. This object has three properties, `DocName`, `DocID` and `Size`.
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
docs, err := ListDocuments(token)
if err != nil {
    log.Printf("err with ListDocuments: %s", err)
    return
}

for i, doc := range docs {
    fmt.Printf("%d | DocName: [%s], DocID: [%s], Size: [%d]\n--------\n", i, doc.DocName, doc.DocID, doc.Size)
}
```
</TabItem>
<TabItem value="py">

```py
users = account.list_users(token)
for user in users:
    print(user.to_string())
```

</TabItem>
<TabItem value="node">

```javascript
docsResp = await document.listDocuments(client);
docsList = docsResp.documentsList;
docsList.forEach((doc => {
    console.log(doc.toString()) // prints docName, docId, size properties of document objects.
}));
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.responses.*;

final StrongDocDocument document = new StrongDocDocument();
ArrayList<DocumentInfo> docInfoList = document.listDocuments(client, token);
for (DocumentInfo docInfo : docInfoList) {
    String docID = docInfo.getDocID();
    String docName = docInfo.getDocName();
    long docSize = docInfo.getSize();
}
```
</TabItem>
</Tabs>

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
var docID string // set docID of the document here

err := RemoveDocument(token, docID)
if err != nil {
    log.Printf("err with RemoveDocument: %s", err)
    return
}
```

</TabItem>
<TabItem value="py">

```py
document.remove_document(token, doc_id)
```

</TabItem>
<TabItem value="node">

```javascript
let docId; // set value here

let removeDocRes = await document.removeDocument(client, docId);
console.log("removeDocRes: " + removeDocRes);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;

final StrongDocDocument document = new StrongDocDocument();
Boolean success = document.removeDocument(client, token, docID);
```
</TabItem>
</Tabs>
