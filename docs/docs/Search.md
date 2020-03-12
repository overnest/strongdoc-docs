import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Searching Documents

Search amongst the documents you have with search.

The document ID and its associated score is returned. The higher the score, the stronger the match of the document with the query sent.

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
results, err := Search(token, "bed")
if err != nil {
    log.Printf("search failed: %s", err)
    return
}
for _, res := range results {
    fmt.Printf("docID: %s, score: %f\n", res.DocID, res.Score)
}
```

</TabItem>
<TabItem value="py">

```py
hits = search.search(token, "bed mounts")
for hit in hits:
    print(hit)
```

</TabItem>
<TabItem value="node">

```javascript
resp = await search.search(client, token, "bed mounts");
resp.getHitsList().forEach(hit => {
    console.log(hit.toString());
});
// resp.getHitsList().forEach(function(hit){
//     if (hit.getDocID() != upDocId && hit.getDocID() != encDocId) {
//         throw Error("The search result does not match.")
//     }
// });
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
