import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section allows you to check your Billing status. 

## Billing

Call the `Billing` function to retrieve details of your Billing; this makes accounting with our service easier.
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

Here's what this Billing object contains:

| Name          | Method          | Returns           | Description                                                       |
|---------------|-----------------|-------------------|-------------------------------------------------------------------|
| CurrentPeriod | CurrentPeriod() | *BillingPeriod    | Current Billing Period                                            |
| TotalCost     | TotalCost()     | int32             | Total Cost incurred                                               |
| Documents     | Documents()     | *BillingDocuments | Encapsulates total cost and size of the Documents stored          |
| Index         | Index()         | *BillingIndex     | Encapsulates total cost and size of the Indexes stored            |
| Traffic       | Traffic()       | *BillingTraffic   | Encapsulates total cost and size of incoming and outgoing traffic |
| NextPeriod    | NextPeriod()    | *BillingPeriod    | Next Billing Period                                               |

```go
billingDetails, err := api.Billing(token)
if err != nil {
    log.Printf("failed to get Billing Details: %s", err)
    os.Exit(1)
}
```
</TabItem>
<TabItem value="py">

| Name          | Method          | Returns           | Description                                                       |
|---------------|-----------------|-------------------|-------------------------------------------------------------------|
| CurrentPeriod | CurrentPeriod() | BillingPeriod     | Current Billing Period                                            |
| TotalCost     | TotalCost()     | int               | Total Cost incurred                                               |
| Documents     | Documents()     | Cost              | Encapsulates total cost and size of the Documents stored          |
| Index         | Index()         | Cost              | Encapsulates total cost and size of the Indexes stored            |
| Traffic       | Traffic()       | Traffic           | Encapsulates total cost and size of incoming and outgoing traffic |
| NextPeriod    | NextPeriod()    | BillingPeriod     | Next Billing Period                                               |

```py
billingDetails = billing.get_billing_details(token)
```

</TabItem>
<TabItem value="node">

| Name          | Method          | Returns           | Description                                                       |
|---------------|-----------------|-------------------|-------------------------------------------------------------------|
| CurrentPeriod | CurrentPeriod() | BillingPeriod     | Current Billing Period                                            |
| TotalCost     | TotalCost()     | number            | Total Cost incurred                                               |
| Documents     | Documents()     | Cost              | Encapsulates total cost and size of the Documents stored          |
| Index         | Index()         | Cost              | Encapsulates total cost and size of the Indexes stored            |
| Traffic       | Traffic()       | Traffic           | Encapsulates total cost and size of incoming and outgoing traffic |
| NextPeriod    | NextPeriod()    | BillingPeriod     | Next Billing Period                                               |

```javascript
const { billing } = require('strongdoc-nodejs-sdk');

const billingDetailsRes = await billing.getBillingDetails(client);
```

</TabItem>
<TabItem value="java">

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.print("Hello World!");
    }
}
```
</TabItem>
</Tabs>

For the full and updated list of the properties in the BillingDetails object,
you may read the [API documentation](https://apidocs.strongsalt.com) for further details. 
