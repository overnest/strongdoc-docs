## Login

To authenticate (so we know who you are) and authorize (so we know what you're allowed to do) the user, they will need to perform a `Login`.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
// set your credentials here
var userID string
var password string
var orgID string

token, err := api.Login(userID, password, orgID)
if err != nil {
    log.Printf("failed to log in: %s", err)
    os.Exit(1)
}
fmt.Printf("Successfully logged in.\n")
```

Alternatively, you can first do the above and run `go get all`.


**Link to API Github Repository**: https://github.com/overnest/strongdoc-go-sdk

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import login
# set your user_id, user_pass, org_id (strings) here
login.login(user_id, user_pass, org_id)
```

</TabItem>
<TabItem value="node">

```javascript
const login = require('./api/login');

let client = new sd.StrongDoc(sd.StrongDoc.ServciceLocation.LOCAL);

const userName     = "userUserName", 
      userPassword = "userUserPassword",
      userEmail    = "userUser@somewhere.com";
      organization = "OrganizationOne";
      
let token = await login.login(client, userName, userPassword, organization);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set your credentials here
final String userID;
final String password;
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
final String token = account.login(client, orgID, userID, password);
```
</TabItem>
</Tabs>

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.

## Logout

Once you finish your session, make sure to `Logout`. This will retire the key from use.

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
var token string // set your token here

err := api.Logout(token)
if err != nil {
    log.Printf("Failed to log out: %s\n", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
login.logout(token)
```

</TabItem>
<TabItem value="node">

```javascript
let logoutStatus = await login.logout(client, token);
console.log("logoutStatus: " + logoutStatus);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set your token here
final String token;

final StrongDocAccount account = new StrongDocAccount();
String status = account.logout(client, token);
```
</TabItem>
</Tabs>
