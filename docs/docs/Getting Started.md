import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to Strongdoc *Getting Started* guide. Strongdoc is a service that makes data privacy simple to implement in your own services.

Following the instructions in this guide will properly equip you to start using the Strongdoc API.

## Prerequisites

There is only one prerequisite, and it is that you have your preferred language installed on your device. 
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

**Install Go on your OS**: https://golang.org/doc/install  
**Link to API Github Repository**: https://github.com/overnest/strongdoc-go-sdk


## Downloading and Setting Up the Strongdoc Go API

The API is available as a Go Module. To use it, run

`go get github.com/overnest/strongdoc-go@v0.1.10`

Then, import it at the top of your files:

```go
import (
    // other imports
    "github.com/overnest/strongdoc-go-sdk/api"`
    // even more imports
)
```

Alternatively, you can first do the above and run `go get all`.


**Link to API Github Repository**: https://github.com/overnest/strongdoc-go-sdk

</TabItem>
<TabItem value="py">

**Install Python3 on your OS**: https://www.python.org/downloads/  
**Link to API Github Repository**: https://github.com/overnest/strongdoc-python-sdk

The API is available as module on PyPI, and requires python3. To install it, run:

`pip install strongsalt-strongdoc-python-sdk`

Or, depending on how your system is setup, you may have to use:

`pip3 install strongsalt-strongdoc-python-sdk`

Then, import the modules you need at the top of your files:

```py
from strongdoc.api import account, document, login, search, billing
```

There are examples showing how to use Strongdoc with python on this website, and the full details can be found in the [Strongdoc Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/index.html).

</TabItem>
<TabItem value="node">

**Install NodeJS on your OS**: https://nodejs.org/en/download/  
**Link to API Github Repository**: https://github.com/overnest/strongdoc-nodejs-sdk

The API is available as module on npm. To use it, run

`npm i strongdoc-nodejs-sdk`

Then, import the modules you need at the top of your files:

```javascript
const {StrongDoc, auth, accounts, documents, search, billing} = require('strongdoc-nodejs-sdk')
```

</TabItem>
<TabItem value="java">

**Install Java on your OS**: https://java.com/en/download/help/download_options.xml  
**Link to API Github Repository**: https://github.com/overnest/strongdoc-java-sdk


## Downloading and Setting Up the Strongdoc Java API

The SDK can be installed by adding a Maven dependency.  
Please refer to https://github.com/overnest/strongdoc-java-sdk for the latest released version.

Add the following to Maven dependency.

```java
<dependency>
    <groupId>com.strongsalt.strongdoc.sdk</groupId>
    <artifactId>strongDocSdk</artifactId>
    <version>1.0.4</version>
</dependency>
```

Then, import the classes you need at the top of your files:

```java
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.StrongDocSearch;
import com.strongsalt.strongdoc.sdk.client.StrongDocServiceClient;
```

### Example of how to create a client:

```java
import io.netty.handler.ssl.SslContext;

public final static String HOST = "api.strongsalt.com";
public final static int PORT = 9090;

final SslContext sslContext =
    StrongDocServiceClient.buildSslContext("./certs/grpc.root.pem",
                                           "./certs/grpc.cert.pem",
                                           null);

final StrongDocServiceClient client = new StrongDocServiceClient(sslContext, HOST, PORT);
```
</TabItem>
</Tabs>

## Setting up your first account

Before logging in, ensure that you have an account. 
If you do not have one, what you need to do depends on 
your role in your organization:

### A. You are a **regular user**

If you are a regular user, you need to ask your organization administrator 
to help you set up an account. They should give you:  
- A `userID`  
- A `password`   
- The `orgID` belonging to your organization  

### B. You are an **organization administrator**

Again, this depends. If...

#### I. You are not the first Administrator

If you are an admin of your organization and do not have an account,
contact an existing administrator create one for you. 

> **Warning**, if you are the only admin and you lose your credentials,
> please contact us for assistance.
> 
