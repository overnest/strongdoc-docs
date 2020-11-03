import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Uploading Documents

Our storage service allows you to securely encrypt and store your documents with Strongdoc.

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
docID, err = api.UploadDocument(client, filename, fileBytes)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]", docID)
```

</TabItem>
<TabItem value="py">

To upload a document the data must be of type `bytes`, or a readable subclass of `io.BufferedIOBase` which the data can be streamed from.

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

# Then upload the data:
docid = document.upload_document(token, doc_name, my_bytes)
```
The docID is needed to download the document.

For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.upload_document).

</TabItem>
<TabItem value="node">

```javascript
const fs = require('fs');
const { document } = require('strongdoc-nodejs-sdk');

const data = fs.readFileSync(filepath);

const resp = await document.uploadDocument(client, 'file name', data);
const docId = resp.getDocID();
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the filename
final String filename;
// Create a File
File file = new File("path_to_file/" + filename);

final StrongDocDocument document = new StrongDocDocument();
final byte[] data = Files.readAllBytes(file.toPath());
final String docID = document.uploadDocument(client, filename, data);
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

docID, err := api.UploadDocumentStream(filename, fileReader)
if err != nil {
    log.Printf("Can not upload document: %v", err)
    os.Exit(1)
}
fmt.Printf("Uploaded document, docID: [%s]\n", docID)
```
</TabItem>
<TabItem value="py">

To upload a document from a stream, the stream must be a readable subclass of `io.BufferedIOBase`, such as a file opened in `rb` mode.

```py
from strongdoc.api import document

# login and get a token

with open('path/to/file', 'rb') as doc_file:
    docid = document.upload_document(token, doc_name, doc_file)
```
The docID is needed to download the document.

For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.upload_document).

</TabItem>
<TabItem value="node">

```javascript
const fs = require('fs');
const { document } = require('strongdoc-nodejs-sdk');

const readStream = fs.createReadStream('./path/file');

const response = await document.uploadDocumentStream(client, docName, readStream);
const docId = response.getDocID();
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
// Create a File
File file = new File("path_to_file/" + filename);

final StrongDocDocument document = new StrongDocDocument();
final UploadDocumentResponse uploadDocumentResponse = document.uploadDocumentStream(
    client, filename, new FileInputStream(file));

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

rcvdBytes, err = api.DownloadDocument(client, docID)
if err != nil {
    log.Printf("Can not download document: %v", err)
    os.Exit(1)
}
fmt.Printf("Received file, bytes: [%v]\n", rcvdBytes)
```

</TabItem>
<TabItem value="py">
This will download a document and return the data as type `bytes`.

```py
from strongdoc.api import document

# login and get a token

# upload a document and save the docid

doc_bytes = document.download_document(token, docid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.download_document).

</TabItem>
<TabItem value="node">

```javascript
const { document } = require('strongdoc-nodejs-sdk');

const file = await document.downloadDocument(client, docId);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;

final StrongDocDocument document = new StrongDocDocument();
final byte[] plaintext = document.downloadDocument(client, docID);
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

dataStream, err := DownloadDocumentStream(client, docID)
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

You can also download a document by streaming it to a writable subclass of `io.BufferedIOBase`, such as a file opened in `wb` mode.

```py
from strongdoc.api import document

# login and get a token

# upload a document and save the docid

with open('path/to/output_file', 'wb') as doc_file:
    document.download_document_stream(token, docid, doc_file)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.download_document_stream).

</TabItem>
<TabItem value="node">
You must provide a Readable stream that yields the data of the file.

downloadDocumentStream returns a Readable stream yielding the plaintext.

```javascript
const downloadStream = document.downloadDocumentStream(client, docID);

// iterate
for await (let chunk of downloadStream) {
    // do something with chunk
}

// or pipe
downloadStream.pipe(writable)
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;

final StrongDocDocument document = new StrongDocDocument();
InputStream inputStream = document.downloadDocumentStream(client, docID);
byte[] documentText = ByteStreams.toByteArray(inputStream);
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
docs, err := ListDocuments(client)
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

This will return a list of `DocumentMetadata`.

```py
from strongdoc.api import document

# login and get a token

doc_list = document.list_documents(token)

for doc in doc_list:
    print('DocID: ', doc.docid)
    print('Doc Name: ', doc.doc_name)
    print('Doc Size: ', doc.size)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.list_documents).

</TabItem>
<TabItem value="node">

```javascript
const docsResp = await document.listDocuments(client);
const docsList = docsResp.documentsList;
//array
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.responses.*;

final StrongDocDocument document = new StrongDocDocument();
ArrayList<DocumentInfo> docInfoList = document.listDocuments(client);
for (DocumentInfo docInfo : docInfoList) {
    String docID = docInfo.getDocID();
    String docName = docInfo.getDocName();
    long docSize = docInfo.getSize();
}
```
</TabItem>
</Tabs>

<!-- 
# Get Document Size and Get Index Size

This function allows you to check the size of your documents and index. 

```go
docs, err := api.GetDocumentsSize(token)
if err != nil {
    log.Printf("err with ListDocuments: %s", err)
    return
}
fmt.Printf("The total size of your documents is %d")
```

> Not implemented yet.
 -->

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

err := RemoveDocument(client, docID)
if err != nil {
    log.Printf("err with RemoveDocument: %s", err)
    return
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import document

# login and get a token

# upload or encrypt a document and save the docid

document.remove_document(token, docid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.remove_document).

</TabItem>
<TabItem value="node">

```javascript

const success = await document.removeDocument(client, docId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;

final StrongDocDocument document = new StrongDocDocument();
Boolean success = document.removeDocument(client, docID);
```
</TabItem>
</Tabs>
