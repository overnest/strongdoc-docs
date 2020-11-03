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

userID, err := api.RegisterUser(client, username, password, email, admin)
if err != nil {
    log.Printf("failed to Register User: %s", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

username = "user1"
password = "password"
email = "user1@website.com"
make_admin = True

account.register_user(token, username, password, email, make_admin)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.register_user).

</TabItem>
<TabItem value="node">

```javascript
const { accounts } = require('strongdoc-nodejs-sdk')

const userID = await accounts.registerUser(client, userName, userPassword, userEmail, isAdmin);
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Fill in new user's info and indicate if the new user shoulbe be admin
final String username;
final String password;
final String email;
final boolean admin;

final StrongDocAccount account = new StrongDocAccount();
final String userID = account.registerUser(client, username, password, email, admin);
```
</TabItem>
</Tabs>

> This can only be called by an administrator of the organization.

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

count, err := api.RemoveUser(client, userID)
if err != nil {
    log.Printf("failed to Remove User: %s", err)
    os.Exit(1)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

userid = 'userid_to_remove'

account.remove_user(token, userid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.remove_user).
</TabItem>
<TabItem value="node">

```javascript
const { accounts } = require('strongdoc-nodejs-sdk')

const count = await accounts.removeUser(client, userId);
// count of users successfully removed
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set user's user ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
final long removeCount = account.removeUser(client, userID);
```
</TabItem>
</Tabs>

> This can only be called by an administrator of the organization.

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
users, err := api.ListUsers(client)
if err != nil {
    log.Printf("failed to List Users: %s", err)
    os.Exit(1)
}
for i, user := range users {
    fmt.Printf("%d | UserName: [%s], UserID: [%s], IsAdmin: [%t]\n--------\n", i, u.UserName, u.UserID, u.IsAdmin)
}
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

users = account.list_users(token)
for user in users:
    print("Username: ", user.username)
    print("UserID: ", user.userid)
    print("Is Admin: ", user.is_admin)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.list_users).

</TabItem>
<TabItem value="node">

```javascript
const users = await accounts.listUsers(client);
// array of users
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;
import com.strongsalt.strongdoc.sdk.api.responses.*;

final StrongDocAccount account = new StrongDocAccount();
ArrayList<OrgUserInfo> usersList = account.listUsers(client);
for (OrgUserInfo orgUserInfo : usersList) {
    String userID = orgUserInfo.getUserID();
    String username = orgUserInfo.getUsername();
    boolean isAdmin =  orgUserInfo.isAdmin();
}
```
</TabItem>
</Tabs>

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

ok, err := api.PromoteUser(client, userID)
if err != nil {
    log.Printf("failed to Promote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Promoted.\n", userID)
```

</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

userid = 'userID_of_user_to_promote'

account.promote_user(userid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.promote_user).
</TabItem>
<TabItem value="node">

```javascript

const success = await accounts.promoteUser(client, userId);
//true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the user's ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
final Boolean success = account.promoteUser(client, userID);
```
</TabItem>
</Tabs>

> This can only be called by an administrator of the organization.

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

ok, err := api.DemoteUser(client, userID)
if err != nil {
    log.Printf("failed to Demote User: %s", err)
    os.Exit(1)
}
fmt.Printf("User [%s] Demoted.\n", userID)
```


</TabItem>
<TabItem value="py">

```py
from strongdoc.api import account

# login and get a token, which identifies a user and an organization

userid = 'userID_of_user_to_demote'

account.demote_user(token, userid)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.account.demote_user).

</TabItem>
<TabItem value="node">

```javascript

const success = await accounts.demoteUser(client, userId);
// true|false
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

// Set the user's ID
final String userID;

final StrongDocAccount account = new StrongDocAccount();
Boolean success = account.demoteUser(client, userID);
```
</TabItem>
</Tabs>

> You cannot demote a user if they are the last administrator of the organization.

> This can only be called by an administrator of the organization.


### Get Account Information

Obtain information about the user account.

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
accountInfo, err := api.GetAccountInfo(client)
if err != nil {
    log.Printf("Failed to get account information: %s", err)
    os.Exit(1)
}
fmt.Println(
    account.OrgID, 
    account.OrgAddress, 
    account.Subscription.Status, 
    account.Subscription.Type, 
    account.MultiLevelShare)
for _, org := range account.SharableOrgs {
    fmt.Println(org)
}
for _, pay := range account.Payments {
    fmt.Println(
        pay.Status, 
        pay.Amount, 
        pay.BilledAt, 
        pay.PeriodEnd, 
        pay.PeriodStart)
}
```
</TabItem>
<TabItem value="py">

```py
To be provided
```

</TabItem>
<TabItem value="node">

```javascript
const account = await accounts.getAccountInfo(client)

console.log("Account Info: ", 
    account.orgId, 
    account.orgAddress, 
    account.subscription, 
    account.multiLevelShare, 
    account.sharableOrgs, 
    account.payments)
account.payments.map(x => 
    console.log("Payment: ", x.billedAt, x.periodStart, x.periodEnd, x.amount, x.status))
account.sharableOrgs.map(x => console.log("Sharable Org: ", x))
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.api.StrongDocAccount;

import com.google.protobuf.Timestamp;

final StrongDocAccount account = new StrongDocAccount();
AccountInfoResponse accountInfoResponse = account.getAccountInfo(client);

final Subscription subscription = accountInfoResponse.getSubscription();
// Subscription type (AWS Marketplace, Credit Card, etc.)<Paste>
final String type = subscription.getType();
// State of the subscription (Created, Subscribed, Unsubscribed, etc.)
final String status = subscription.getStatus();

ArrayList<Payment> payments = accountInfoResponse.getPayments();
for (Payment payment : payments) {
    // Timestamp of the payment billing transaction
    final Timestamp billAt = payment.getBillAt();
    // Start of the payment period
    final Timestamp periodStart = payment.getPeriodStart();
    // End of the payment period
    final Timestamp periodEnd = payment.getPeriodEnd();
    // Amount of  payment
    final double amount = payment.getAmount();
    // Payment status ("No Payment","Zero Payment","Payment Pending","Payment Success","Payment Failed")
    final String paymentStatus = payment.getStatus();
}
```
</TabItem>
</Tabs>
