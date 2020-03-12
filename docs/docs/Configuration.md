import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Configuration

Configuration simply returns the current configuration of the server
as a string.
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
var config string

config, err = GetConfiguration(token)
if err != nil {
    log.Printf("failed to get Configuration: %s", err)
    os.Exit(1)
}
fmt.Printf("Configuration recieved: %s", config)
```
</TabItem>
<TabItem value="py">

```py
config.get_configuration(token)
```

</TabItem>
<TabItem value="node">

```javascript
const config = require('./api/config');

let configStatus = await config.getConfiguration(client);
console.log(configStatus);
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

