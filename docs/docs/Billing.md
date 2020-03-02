This section allows you to check your Billing status. 

## Billing

Call the `Billing` function to retrieve details of your Billing; this makes accounting with our service easier.

```go
billingDetails, err := api.Billing(token)
if err != nil {
    log.Printf("failed to get Billing Details: %s", err)
    os.Exit(1)
}
```

Here's what this Billing object contains:

| Name          | Method          | Returns           | Description                                                       |
|---------------|-----------------|-------------------|-------------------------------------------------------------------|
| CurrentPeriod | CurrentPeriod() | *BillingPeriod    | Current Billing Period                                            |
| TotalCost     | TotalCost()     | int32             | Total Cost incurred                                               |
| Documents     | Documents()     | *BillingDocuments | Encapsulates total cost and size of the Documents stored          |
| Index         | Index()         | *BillingIndex     | Encapsulates total cost and size of the Indexes stored            |
| Traffic       | Traffic()       | *BillingTraffic   | Encapsulates total cost and size of incoming and outgoing traffic |
| NextPeriod    | NextPeriod()    | *BillingPeriod    | Next Billing Period                                               |

For the full and updated list of the properties in the BillingDetails object,
you may read the [API documentation](https://godoc.org/github.com/overnest/strongdoc-go-sdk/api) for further details. 
