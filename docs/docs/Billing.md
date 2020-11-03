import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section allows you to check your Billing status; this makes accounting with our service easier.

## Billing Details

List all items of the cost breakdown and also other details such as the billing frequency.

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
billingDetails, err := api.GetBillingDetails(client)
if err != nil {
    log.Printf("failed to get Billing Details: %s", err)
    os.Exit(1)
}
```
</TabItem>
<TabItem value="py">

```py
from strongdoc.api import billing

# login and get a token...

billing_details = billing.get_billing_details(token)
```

The return value is of type `BillingDetails`, which has the following attributes:

| Attribute           | Type                | Description                                                       |
|---------------------|---------------------|-------------------------------------------------------------------|
| `period_start`      | `datetime.datetime` | Start of current billing period                                   |
| `period_end`        | `datetime.datetime` | End of current billing period                                     |
| `total_cost`        | `float`             | Total Cost incurred                                               |
| `documents`         | `DocumentCosts`     | Encapsulates total cost and size of the documents stored          |
| `search`            | `SearchCosts`       | Encapsulates total cost and size of the search data stored        |
| `traffic`           | `TrafficCosts`      | Encapsulates total cost and size of incoming and outgoing traffic |
| `billing_frequency` | `BillingFrequency`  | Current billing frequency                                         |

More details can be found in the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#module-strongdoc.api.billing)
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
console.log(billingDetailsRes);
// BillingDetails {
//   periodStart: 2020-11-02T22:26:36.950Z,
//   periodEnd: 2020-12-01T00:00:00.000Z,
//   totalCost: 0,
//   documents: {
//     cost: 0,
//     size: 0.0005738891950654984,
//     tier: 'Document Storage Free'
//   },
//   search: { cost: 0, size: 0, tier: 'Search Index Storage Free' },
//   traffic: { cost: 0, incoming: 0, outgoing: 0, tier: 'Network Traffic Free' },
//   frequency: BillingFrequency {
//     frequency: 1,
//     validFrom: 2020-11-02T22:26:36.950Z,
//     validTo: undefined
//   }
// }
```

</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.responses.*;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;

// Set the timestamp of the requested billing details
final Timestamp at = Timestamps.parse("2020-03-29T15:17:59Z");

final StrongDocBilling billing = new StrongDocBilling();
BillingDetailsResponse billingDetailsResponse = billing.getBillingDetails(
    client, at);

// The start of current billing period
final String periodStart = billingDetailsResponse.getPeriodStart();
// The end of current billing period
final String periodEnd = billingDetailsResponse.getPeriodEnd();
// the total cost incurred
final double totalCost = billingDetailsResponse.getTotalCost();

// The total cost and size of the documents stored
DocumentCosts dc = billingDetailsResponse.getDocumentCosts();
final double dcCost = dc.getCost();
final double dcSize = dc.getSize();
final String dcTier = dc.getTier();

// The total cost and size of the search data stored
SearchCosts sc = billingDetailsResponse.getSearchCosts();
final double scCost = sc.getCost();
final double scSize = sc.getSize();
final String scTier = sc.getTier();

// The total cost and size of incoming and outgoing traffic
TrafficCosts tc = billingDetailsResponse.getTrafficCosts();
final double tcCost = tc.getCost();
final double tcIncoming = tc.getIncoming();
final double tcOutgoing = tc.getOutgoing();
final String tcTier = tc.getTier();

// The current billing frequency
BillingFrequency bf = billingDetailsResponse.getBillingFrequency();
final Billing.TimeInterval frequency = bf.getFrequency();
final Timestamp validFrom = bf.getValidFrom();
final Timestamp validTo = bf.getValidTo();
```
</TabItem>
</Tabs>

For the full and updated list of the properties in the BillingDetails object,
you may read the [API documentation](https://apidocs.strongsalt.com) for further details. 

## Get Billing Frequency List

Obtain the list of billing frequencies (past, current and future).

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
    frequencyList, err := api.GetBillingFrequencyList(client)
    if err != nil {
        log.Printf("failed to get Billing Frequency List: %s", err)
        os.Exit(1)
    }

    for i, freq := range frequencyList {
        fmt.Printf("Frequency[%v]: %v\n", i, freq)
    }
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
const { billing } = require('strongdoc-nodejs-sdk');

const resp = await billing.getBillingFrequencyList(client);
// BillingFrequency {
//   frequency: 1,
//   validFrom: 2020-11-02T22:45:05.034Z,
//   validTo: undefined
// }
billingFrequencyListResp.map(x => console.log("resp: ", x));
```
</TabItem>

<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.proto.Billing;

import com.google.protobuf.Timestamp;

import java.util.ArrayList;

final StrongDocBilling billing = new StrongDocBilling();
BillingFrequencyListResponse billingFrequencyListResponse = 
    billing.getBillingFrequencyList(client);

ArrayList<BillingFrequency> frequencies = 
    billingFrequencyListResponse.getBillingFrequencyList();

for (BillingFrequency billingFrequency : frequencies) {
    // Billing frequency
    final Billing.TimeInterval frequency = billingFrequency.getFrequency();
    // Start fo billing frequency validity
    final Timestamp tValidFrom = billingFrequency.getValidFrom();
    // End of billing frequency validity
    final Timestamp tValidTo = billingFrequency.getValidTo();
}
```
</TabItem>

</Tabs>

## Set Next Billing Frequency

Change the next billing frequency.

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
    newFrequency, err := api.SetNextBillingFrequency(proto.TimeInterval_MONTHLY, time.Now().AddDate(0, 2, 0))
    if err != nil {
        log.Printf("failed to get Set Next Billing Frequency: %s", err)
        os.Exit(1)
    }
	fmt.Printf("New Frequency: %v\n", newFrequency)
```
</TabItem>

<TabItem value="py">

```py
To be provided
```
</TabItem>

<TabItem value="node">

```javascript
const { billing } = require('strongdoc-nodejs-sdk');

// billing.TimeInterval = {
//   UNDEFINED: 0,
//   MONTHLY: 1,
//   YEARLY: 2
// };
const resp = await billing.setNextBillingFrequency(client, 
    billing.TimeInterval.MONTHLY, new Date());
// setNextBillingFrequencyResp:  
//   BillingFrequency {
//      frequency: 1, 
//      validFrom: Mon Nov 02 2020 17:21:16 GMT-0800 (Pacific Standard Time), 
//      validTo: undefined
//   }
console.log("setNextBillingFrequencyResp: ", resp);
```
</TabItem>

<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.responses.*;
import com.strongsalt.strongdoc.sdk.proto.Billing;

import com.google.protobuf.Timestamp;

final Timestamp validFrom = Timestamps.parse("2022-02-20T23:59:59Z");
final Billing.TimeInterval frequency = Billing.TimeInterval.MONTHLY;

final StrongDocBilling billing = new StrongDocBilling();
NextBillingFrequencyResponse nextBillingFrequencyResponse = 
    billing.setNextBillingFrequency(client, frequency, validFrom);

BillingFrequency nbf = nextBillingFrequencyResponse.getNextBillingFrequency();

// Billing frequency
final Billing.TimeInterval freq = nbf.getFrequency();
// Start fo billing frequency validity
final Timestamp validFrom = nbf.getValidFrom();
// End of billing frequency validity
final Timestamp validTo = nbf.getValidTo();
```
</TabItem>

</Tabs>

## Get Large Traffic Usage

Obtain the list of large traffic usages.

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
	largeTraffic, err := api.GetLargeTraffic(time.Now())
    if err != nil {
        log.Printf("Failed to get large traffic: %s", err)
        os.Exit(1)
    }
	fmt.Println("Large Traffic:", largeTraffic)
```
</TabItem>

<TabItem value="py">

```py
To be provided
```
</TabItem>

<TabItem value="node">

```javascript
const { billing } = require('strongdoc-nodejs-sdk');

const resp = await billing.getLargeTraffic(client, new Date());
// getLargeTrafficResp:  {
//   largeTraffic: [],
//   periodStart: 2020-11-02T23:46:42.001Z,
//   periodEnd: 2020-12-01T00:00:00.000Z
// }
console.log("getLargeTrafficResp: ", resp);
```
</TabItem>

<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocBilling;
import com.strongsalt.strongdoc.sdk.api.responses.*;

import com.google.protobuf.Timestamp;
import com.google.protobuf.util.Timestamps;

import java.util.ArrayList;

// Set the timestamp of the requested traffic information
final Timestamp at = Timestamps.parse("2020-03-29T15:17:59Z");

final StrongDocBilling billing = new StrongDocBilling();
LargeTrafficResponse largeTrafficResponse = billing.getLargeTraffic(client, at);

// Start of the requested billing period
final String periodStart = largeTrafficResponse.getPeriodStart();
// End of the requested billing period
final String periodEnd = largeTrafficResponse.getPeriodEnd();

ArrayList<TrafficDetail> trafficDetailList = largeTrafficResponse.getTrafficDetails();
for (TrafficDetail trafficDetail : trafficDetailList) {
    // Timestamp of the large traffic event
    final String time = trafficDetail.getTime();
    // The ID of the user who made the request
    final String userID = trafficDetail.getUserID();
    // HTTP method of the request
    final String method = trafficDetail.getMethod();
    // URI called by the request
    final String uri = trafficDetail.getURI();
    // Size of the request (in MB)
    final double incoming = trafficDetail.getIncoming();
    // Size of the response (in MB)
    final double outgoing = trafficDetail.getOutgoing();
}
```
</TabItem>

</Tabs>
