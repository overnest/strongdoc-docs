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

**Install Python on your OS**: https://www.python.org/downloads/  
**Link to API Github Repository**: https://github.com/overnest/strongdoc-python-sdk

The API is available as module on pip. To use it, run

`npm i strongdoc-nodejs-sdk`

Then, import the modules you need at the top of your files:

```py
from strongdoc.api import account, document, login, search, config
```


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

Add the following to Maven dependency.

```java
<dependency>
    <groupId>com.strongsalt.strongdoc.sdk</groupId>
    <artifactId>strongDocSdk</artifactId>
    <version>1.0.3</version>
</dependency>
```

Then, import the classes you need at the top of your files:

```java
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;
import com.strongsalt.strongdoc.sdk.api.StrongDocSearch;
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.client.StrongDocServiceClient;
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
a. a `userID`
b. a `password` 
c. the `orgID` belonging to your organization

### B. You are an **organization administrator**

Again, this depends. If...

#### I. You are not the first Administrator

If you are an admin of your organization and do not have an account,
contact an existing administrator create one for you. 

#### II. You are the first Administrator of your Organization

However, if you are the *first* administrator of your organization, you need to register below.

Do the following:

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

// Replace the below values as appropriate
var orgName string = "myOrg"
var orgAddr string = "myAddr"
var adminName string = "john-doe"
var adminPassword string = "password123"
var adminEmail string = "hello@strongsalt.com"

orgID, adminID, err := api.RegisterOrganization(orgName, orgAddr, adminName, adminPassword, adminEmail)
if err != nil {
    log.Printf("Failed to register organization: %s", err)
    os.Exit(1)
}
fmt.Printf("Successfully registered.\n Your orgID: [%s]\n, adminID: [$s]\n", orgID, adminID)
```

Alternatively, you can first do the above and run `go get all`.

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# fill in your organization's and your first admin's info here
org_id, admin_id = account.register_organization(org_name, org_address, admin_name, admin_pass, admin_email)
print(f"Registered successfully, org_id: {org_id}, admin_id: {admin_id}")
```

</TabItem>
<TabItem value="node">

```javascript
cosnt {StrongDoc, accounts} = require('strongdoc-nodejs-sdk')

const client = new StrongDoc(StrongDoc.ServciceLocation.DEFAULT);

const resp = await accounts.registerOrganization(client, organization, orgAddress, adminName, adminPassword, adminEmail);

// the orgId and userId are available via these methods
const orgId = resp.getOrgID();
const userId = resp.getUserID();
```

</TabItem>
<TabItem value="java">

```java
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import io.netty.handler.ssl.SslContext;

public final static String SOURCE = ""; // Please ask the administrator to obtain the value
public final static String SOURCE_DATA = ""; // Please ask the administrator to obtain the value
public final static String ORG_ADMIN_NAME = "john-doe";
public final static String ORG_ADMIN_PASSWORD = "password123";
public final static String ORG_ADMIN_EMAIL = "hello@strongsalt.com";
public final static String ORG_NAME = "myOrg";
public final static String ORG_ADDRESS = "myAddr";

public final static String HOST = "api.strongsalt.com";
public final static int PORT = 9090;

final SslContext sslContext =
    StrongDocServiceClient.buildSslContext("./certs/grpc.root.pem",
                                           "./certs/grpc.cert.pem",
                                           null);

final StrongDocServiceClient client = new StrongDocServiceClient(sslContext, HOST, PORT);
final StrongDocAccount account = new StrongDocAccount();

final RegisterOrganizationResponse registerOrganizationResponse =
    account.registerOrganization(client, ORG_NAME, ORG_ADDRESS,
                                 ORG_ADMIN_NAME, ORG_ADMIN_PASSWORD,
                                 ORG_ADMIN_EMAIL, SOURCE, SOURCE_DATA);

// The organization ID and user ID are available via these methods
final String orgID = registerOrganizationResponse.getOrgID();
final String userID = registerOrganizationResponse.getUserID();
```
</TabItem>
</Tabs>

If your registration is successful, then you should receive a response. For more information, visit the API reference for[`registerOrganization`](Organizations.md#register-organization).

> **Warning**, if you are the only admin and you lose your credentials,
> please contact us for assistance.
> 
