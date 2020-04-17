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

const userID     = "userID@organization.com"
const userPasswd = "userPassword"
const orgID      = "organizationID"

token, err := api.Login(userID, userPasswd, orgID)
if err != nil {
    log.Printf("failed to Login: %s", err)
    os.Exit(1)
}
```
The Go client does not require the user to keep the `token` object around. This token is automatically stored in the global singlton client object. Once the login is successful, the user can start calling all other APIs.

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import login

# set your userid, password, and orgid (strings) here
token = login.login(userid, password, orgid)

# token (str) is a required argument for all functions which require authentication
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.login.login).

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.ß

</TabItem>
<TabItem value="node">

```javascript
const { StrongDoc, auth } = require('strongdoc-nodejs-sdk');

const client = new StrongDoc(StrongDoc.ServciceLocation.LOCAL);

const userName     = "userUserName", 
      userPassword = "userUserPassword",
      userEmail    = "userUser@somewhere.com";
      organization = "OrganizationOne";
      
const token = await auth.login(client, userName, userPassword, organization);
```

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set your credentials here
final String userID;
final String password;
final String orgID;

final StrongDocAccount account = new StrongDocAccount();
final String token = account.login(client, orgID, userID, password);
```

The `Login` function returns `token`, a string that acts as an identifier for the session. Most requests following this *must* contain it.

Once you log in, **keep your Bearer Token safe**, as anyone who has it
will be authenticated to do anything that you can. For instance, do not share them in publically accessible areas such as Github or in client code.

Every method requires authentication except this one, `Login` and `RegisterOrganization`.
</TabItem>
</Tabs>

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
err := api.Logout()
if err != nil {
    log.Printf("failed to Logout: %s", err)
    os.Exit(1)
}
```

Calling `logout` automatically erases the authentication token stored in the global singleton StrongDoc client. It also recreates a record on the server that prevents access with the previous token.

**Link to API Github Repository**: https://github.com/overnest/strongdoc-go-sdk

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import login

# save a token returned by a call to login

login.logout(token)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.login.logout)

</TabItem>
<TabItem value="node">

```javascript
const logoutStatus = await auth.logout(client, token);
console.log("logoutStatus: " + logoutStatus);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set your token here
final String token;

final StrongDocAccount account = new StrongDocAccount();
String status = account.logout(client, token);
```
</TabItem>
</Tabs>
