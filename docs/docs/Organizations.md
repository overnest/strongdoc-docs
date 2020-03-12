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
class HelloWorld {
    public static void main(String[] args) {
        System.out.print("Hello World!")
    }
}
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
# set isForce (bool) here
account.remove_organization(token, isForce)
```

</TabItem>
<TabItem value="node">

```javascript
success = await accounts.removeOrganization(client, true);
console.log("Organization remove: ", success);
```

</TabItem>
<TabItem value="java">

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.print("Hello World!")
    }
}
```
</TabItem>
</Tabs>

