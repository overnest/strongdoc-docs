import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

ok, err := api.RemoveOrganization(client, orgID)
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
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.responses.*;

// Set whether the removal will be performed forcefully
final boolean isForce;

final StrongDocAccount account = new StrongDocAccount();
RemoveOrganizationResponse removeOrgResponse = account.removeOrganization(
    client, isForce);

// Whether the removal was successful
final boolean isSuccess = removeOrgResponse.isSuccess();
// True in case the removal will happen later after org has been charged one last time
final boolean isPostponed = removeOrgResponse.isPostponed();
```
</TabItem>
</Tabs>

> This can only be called by an administrator of the organization.


