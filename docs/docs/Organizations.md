import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Register Organization

Register organization creates an organization with the given input and returns the organization ID. 

This function also creates a new administrator account.
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
// Replace the below values as appropriate
var orgName string
var orgAddr string
var adminName string
var adminPassword string
var adminEmail string
var source string
var sourceData string

var orgID string
var adminID string

orgID, adminID, err := RegisterOrganization(orgName, orgAddr, adminName, adminPassword, adminEmail, source, sourceData)
if err != nil {
    fmt.Printf("Could not Register Organization: %v", err)
    os.Exit(1)
}
fmt.Printf("Created new Organization. orgID: %s, adminID: %f\n", orgID, adminID)
```


</TabItem>
<TabItem value="py">

```py
# fill in your organization's and your first admin's info here
orgID, adminID = account.register_organization(org_name, org_address, admin_name, admin_pass, admin_email, source, sourceData)
```

</TabItem>
<TabItem value="node">

```javascript
resp = await accounts.registerOrganization(client, organization, "",adminName, adminPassword, adminEmail, source, sourceData);
// the orgId and userId are available via these methods
console.log("OrgId: " + resp.getOrgID())
console.log("UserID: " + resp.getUserID())
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.responses.*;

// Fill in your organization's and the first admin's info
public final String source;
public final String sourceData;
public final String adminName;
public final String password;
public final String email;
public final String orgName;
public final String orgAddress;

final StrongDocAccount account = new StrongDocAccount();
final RegisterOrganizationResponse registerOrganizationResponse = 
    account.registerOrganization(client, orgName, orgAddress, adminName, password, email, source, sourceData);

// The organization ID and user ID are available via these methods
final String orgID = registerOrganizationResponse.getOrgID();
final String userID = registerOrganizationResponse.getUserID();
```
</TabItem>
</Tabs>

## Remove Organization

Removes an organization, deleting all data stored with the organization.

This requires an administrator privilege.

If the force parameter is false, removal will fail if there is still data stored with the organization. This prevents accidental deletion.
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
var orgID string // set your orgID here

ok, err := RemoveOrganization(orgID)
if err != nil {
    fmt.Printf("Could not Remove Organization: %v", err)
    os.Exit(1)
}
fmt.Println("Removed Organization successfully.")
```


</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

# The second argument is type bool. If not forced, a removal will fail if the organization still holds data.

is_force = True

account.remove_organization(token, is_force)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.remove_organization).

</TabItem>
<TabItem value="node">

```javascript
success = await accounts.removeOrganization(client, true);
console.log("Organization remove: ", success);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set whether the removal will be performed forcefully
final boolean isForce;

final StrongDocAccount account = new StrongDocAccount();
final Boolean success = account.removeOrganization(client, token, isForce);
```
</TabItem>
</Tabs>

