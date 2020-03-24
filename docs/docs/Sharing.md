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
ok, err := ShareDocument(token, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not share: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
# set your doc_id and user_id here
document.share_document(token, doc_id, user_id)
```

</TabItem>
<TabItem value="node">

```javascript

const success = await document.shareDocument(client, docId, userId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;
// Set the user ID
final String userID;

final StrongDocDocument document = new StrongDocDocument();
Boolean success = document.shareDocument(client, token, docID, userID);
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
ok, err := UnshareDocument(token, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not unshare: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
# set your doc_id and user_id here
document.unshare_document(token, doc_id, user_id)
```

</TabItem>
<TabItem value="node">

```javascript

const success = await document.unshareDocument(client, docId, userId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocDocument;

// Set the document ID
final String docID;
// Set the user ID
final String userID;

final StrongDocDocument document = new StrongDocDocument();
long unsharedCount = document.unshareDocument(client, token, docID, userID);
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
ok, err := AddSharableOrg(token, orgID)
if err != nil {
    fmt.Printf("Could not Add Sharable Organization: %v", err)
    os.Exit(1)
}   
```
</TabItem>
<TabItem value="py">

```py
# set org_id here
account.add_sharable_organization(token, org_id)
```

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
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the Organization ID
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.addSharableOrg(client, token, orgID);
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
ok, err := RemoveSharableOrg(token, orgID)
if err != nil {
    fmt.Printf("Could not Remove Sharable Organization: %v", err)
    os.Exit(1)
}   
```

</TabItem>
<TabItem value="py">

```py
# set org_id here
account.remove_sharable_organization(token, org_id)
```

</TabItem>
<TabItem value="node">

```javascript

const success = await accounts.removeSharableOrg(client, orgId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the Organization ID
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.removeSharableOrg(client, token, orgID);
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
ok, err := SetMultiLevelSharing(token, success)
if err != nil {
    fmt.Printf("Could not Set Multi-Level Sharing: %v", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
# set isEnable (bool) here
account.set_multilevel_sharing(token, isEnable)
```

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
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Indicate whether multi-level sharing should be enabled
final boolean isEnable;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.setMultiLevelSharing(client, token, isEnable);
```
</TabItem>
</Tabs>

