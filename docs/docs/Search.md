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
results, err := Search("bed")
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
from stongdoc.api import search

# login and get a token

hits = search.search(token, 'search for this')

for hit in hits:
    print("docID: ", hit.docid)
    print("score: ", hit.score)
```
For more details, read the [Python Documentation](https://strongdoc-python-sdk.readthedocs.io/en/latest/strongdoc.api.html#strongdoc.api.search.search).
</TabItem>
<TabItem value="node">

```javascript

const resp = await search.search(client, 'search query');
const results = resp.getHitsList()
// array
```
</TabItem>
<TabItem value="java">

```java
// Please follow the 'Getting Started' section example on how to create the 'client'.
// on how to create the 'client'.
import com.strongsalt.strongdoc.sdk.api.StrongDocSearch;
import com.strongsalt.strongdoc.sdk.api.responses.*;

// Set the query words
final String queryWords;

final StrongDocSearch search = new StrongDocSearch();
final SearchDocumentResponse searchResponse = search.runSearch(client, token, queryWords);
final List<SearchDocumentResult> hitsList = searchResponse.getHitsList();
for (SearchDocumentResult result : hitsList) {
    String docID = result.getDocID();
    Double score = result.getScore();
}
```
</TabItem>
</Tabs>
