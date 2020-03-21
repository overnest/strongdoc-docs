## Register User

Creates a user in the organization.

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
var username string // fill in new user's info here
var password string // fill in new user's info here
var email string // fill in new user's info here
var admin bool // indicate if the new user should be admin here

userID, err := api.RegisterUser(token, username, password, email, admin)
if err != nil {
    log.Printf("failed to Register User: %s", err)
    os.Exit(1)
}
fmt.Println("New user created, userID: [%s]\n", userID)
```

</TabItem>
<TabItem value="py">

```py
# assign your data to userName(string), userPass(string), userEmail(string), isAdmin(bool)
account.register_user(token, userName, userPass, userEmail, isAdmin)
```

</TabItem>
<TabItem value="node">

```javascript
// fill in new user's info here
let userName,
    userPassword,
    userEmail,
    isAdmin;

let userID = await accounts.registerUser(client, userName, userPassword, userEmail, isAdmin);
console.log("userID: " + userID);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Fill in new user's info and indicate if the new user shoulbe be admin
final String username;
final String password;
final String email;
final boolean admin;

final StrongDocAccount account = new StrongDocAccount();
final String userID = account.registerUser(client, token, username, password, email, admin);
```
</TabItem>
</Tabs>


## Delete User

Deletes a user in the organization.

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
var userID string // set user's UserID here

count, err := api.RemoveUser(token, userID)
if err != nil {
    log.Printf("failed to Remove User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] deleted.\n", userID)
```

</TabItem>
<TabItem value="py">

```py
# set your user_id here
account.remove_user(token, user_id)
```

</TabItem>
<TabItem value="node">

```javascript
let userId; // set user's userId here

let removeUserRes = await accounts.removeUser(client, userId);
console.log("removeUserRes: " + removeUserRes);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set user's user ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
final long removeCount = account.removeUser(client, token, userID);
```
</TabItem>
</Tabs>


## List Users

Lists all the users in the organization of the current user.

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
users, err := ListUsers(token)
if err != nil {
    log.Printf("failed to List User: %s", err)
    os.Exit(1)
}
for i, u := range users {
    fmt.Printf("%d | UserName: [%s], UserID: [%s], IsAdmin: [%t]\n--------\n", i, u.UserName, u.UserID, u.IsAdmin)
}
```

</TabItem>
<TabItem value="py">

```py
users = account.list_users(token)
for user in users:
    print(user.to_string())
```

</TabItem>
<TabItem value="node">

```javascript
const users = await accounts.listUsers(client);
users.forEach(user => {
    console.log(user.toString());
});
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.responses.*;

final StrongDocAccount account = new StrongDocAccount();
ArrayList<OrgUserInfo> usersList = account.listUsers(client, token);
for (OrgUserInfo orgUserInfo : usersList) {
    String userID = orgUserInfo.getUserID();
    String username = orgUserInfo.getUsername();
    boolean isAdmin =  orgUserInfo.isAdmin();
}
```
</TabItem>
</Tabs>

## Authentication

Some functions require you to be an administrator to execute,
or may grant additional functionality.

### Promote User

Promotes a user in the organization to the Administrator level.


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
var userID string // set user's UserID here

ok, err := api.PromoteUser(token, userID)
if err != nil {
    log.Printf("failed to Promote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Promoted.\n", userID)
```

</TabItem>
<TabItem value="py">

```py
# set your user_id here
account.promote_user(token, user_id)
```

</TabItem>
<TabItem value="node">

```javascript
let userId; // set value here
let promoteUserRes = await accounts.promoteUser(client, userId);
console.log("promoteUser: " + promoteUserRes);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the user's ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
final Boolean success = account.promoteUser(client, token, userID);
```
</TabItem>
</Tabs>

> You can only promote users that are in your organization. 

### Demote User

Demotes a user in the organization from the Administrator level.

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
var userID string // set user's UserID here

ok, err := api.DemoteUser(token, userID)
if err != nil {
    log.Printf("failed to Demote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Demoted.\n", userID)
```


</TabItem>
<TabItem value="py">

```py
# set your user_id here
account.demote_user(token, user_id)
```

</TabItem>
<TabItem value="node">

```javascript
let userId; // set value here
let demoteUserRes = await accounts.demoteUser(client, userId);
console.log("demoteUser: " + demoteUserRes);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the Register Organization example in the 'Getting Started' section
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the user's ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.demoteUser(client, token, userID);
```
</TabItem>
</Tabs>

> You cannot demote a user if he is the last administrator of the organization.

> You can only demote users that are in your organization. 