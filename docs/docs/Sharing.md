## Sharing Documents

You may share your documents with another user here.
They will now be able to do anything that you can. It's important
that you only share documents with users that you trust.

```go
ok, err := ShareDocument(token, docID, otherUserID)
if err != nil {
    fmt.Printf("Could not share: %v", err)
    os.Exit(1)
}
```

> Organization administrators must first add the `OrgID` of the *sharee's* organization
> with [`AddSharableOrg`](Sharing.md#add-sharable-organizations).

## Add Sharable Organizations

Before any users can share their documents with users from other organizations,
administrators must first add those organizations to a whitelist with this function.

```go
ok, err := AddSharableOrg(token, orgID)
if err != nil {
    fmt.Printf("Could not Add Sharable Organization: %v", err)
    os.Exit(1)
}   
```

## Remove Sharable Organizations

Administrators may also remove organizations from the whitelist with `RemoveSharableOrg`.

```go
ok, err := RemoveSharableOrg(token, orgID)
if err != nil {
    fmt.Printf("Could not Remove Sharable Organization: %v", err)
    os.Exit(1)
}   
```

## Set Multi-Level Sharing

Updates your organization's multi-level sharing settings.

```go
ok, err := SetMultiLevelSharing(token, success)
if err != nil {
    fmt.Printf("Could not Set Multi-Level Sharing: %v", err)
    os.Exit(1)
}
```
