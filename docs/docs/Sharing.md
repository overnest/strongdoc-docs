import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Sharing Documents

You may share your documents with another user here.
They will now be able to do anything that you can. It's important
that you only share documents with users that you trust.

> The user that you are sharing with be be in an organization that has been declared available for sharing with the [Add Sharable Organizations](Organizations.md#add-sharable-organizations) function.

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
ok, err := api.ShareDocument(client, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not share: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import document

# login and get a token

# upload a file and save the docid

userid = 'userID_of_user_to_share_to'

document.share_document(token, docid, userid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.share_document).

</TabItem>
<TabItem value="node">

```javascript

const success = await document.shareDocument(client, docId, userId);
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
// Set the user ID
final String userID;

final StrongDocDocument document = new StrongDocDocument();
Boolean success = document.shareDocument(client, docID, userID);
```
</TabItem>
</Tabs>

> Organization administrators must first add the `OrgID` of the *sharee's* organization
> with [`AddSharableOrg`](Sharing.md#add-sharable-organizations).

## Unsharing Documents

This allows you to unshare documents previously shared.

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
ok, err := api.UnshareDocument(client, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not unshare: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import document

# login and get a token

# upload a document and save the docid, then share the document with another user

userid = 'userID_of_user_to_unshare_from'

document.unshare_document(token, docid, userid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.document.unshare_document).

</TabItem>
<TabItem value="node">

```javascript

const success = await document.unshareDocument(client, docId, userId);
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
// Set the user ID
final String userID;

final StrongDocDocument document = new StrongDocDocument();
long unsharedCount = document.unshareDocument(client, docID, userID);
```
</TabItem>
</Tabs>


## Add Sharable Organizations

Before any users can share their documents with users from other organizations,
administrators must first add those organizations to a whitelist with this function.

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
ok, err := api.AddSharableOrg(client, orgID)
if err != nil {
    fmt.Printf("Could not Add Sharable Organization: %v", err)
    os.Exit(1)
}   
```
</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and organization

orgid = 'orgID_of_org_to_add'

account.add_sharable_organization(token, orgid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.add_sharable_org).

</TabItem>
<TabItem value="node">

```javascript
const = { accounts } = require('strongdoc-nodejs-sdk')

const success = await accounts.addSharableOrg(client, orgIdToShareWith);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the Organization ID
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.addSharableOrg(client, orgID);
```
</TabItem>
</Tabs>


## Remove Sharable Organizations

Administrators may also remove organizations from the whitelist with `RemoveSharableOrg`.

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
ok, err := api.RemoveSharableOrg(client, orgID)
if err != nil {
    fmt.Printf("Could not Remove Sharable Organization: %v", err)
    os.Exit(1)
}   
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and organization

orgid = 'orgID_of_org_to_remove'

account.remove_sharable_organization(token, orgid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.remove_sharable_org).

</TabItem>
<TabItem value="node">

```javascript

const success = await accounts.removeSharableOrg(client, orgId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the Organization ID
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.removeSharableOrg(client, orgID);
```
</TabItem>
</Tabs>


## Set Multi-Level Sharing

Updates your organization's multi-level sharing settings.

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
ok, err := api.SetMultiLevelSharing(client, "true")
if err != nil {
    fmt.Printf("Could not Set Multi-Level Sharing: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and organization

enable = True # False to disable

account.set_multilevel_sharing(token, enable)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.set_multilevel_sharing).

</TabItem>
<TabItem value="node">

```javascript
const setMultiLevelSharing = true;

const success = await accounts.setMultiLevelSharing(client, setMultiLevelSharing);
//Boolean
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Indicate whether multi-level sharing should be enabled
final boolean isEnable;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.setMultiLevelSharing(client, isEnable);
```
</TabItem>
</Tabs>

