
# DNS Walkthrough

## Introduction

The Domain Name System (DNS) is one of the most important services on the Internet. It works like the Internet's phonebook by translating human-readable domain names into machine-readable IP addresses.

People prefer using domain names like `google.com` or `github.com` because they are easy to remember. However, computers communicate using IP addresses such as `142.250.190.78` or `140.82.121.4`.

DNS performs the translation between these domain names and IP addresses so users can access websites without remembering long numbers.

---

# What is DNS?

DNS (Domain Name System) is a distributed system that converts a website's domain name into its corresponding IP address.

For example:

Domain Name

```
www.github.com
```

↓

IP Address

```
140.82.121.4
```

Without DNS, every website would have to be opened using its IP address instead of a simple domain name.

DNS makes the Internet faster, easier to use, and more organized.

---

# Why Do We Need DNS?

Without DNS:

- Users would need to memorize IP addresses.
- Websites would become difficult to access.
- Changing a server's IP would require informing every user.

With DNS:

- Users remember only the domain name.
- Website owners can change server IPs without affecting visitors.
- Browsers automatically find the correct server.

---

# What is a CNAME Record?

A CNAME (Canonical Name) record is a DNS record that makes one domain name point to another domain name instead of directly pointing to an IP address.

Example:

```
www.example.com
        │
        ▼
example.netlify.app
        │
        ▼
104.198.xx.xx
```

Instead of storing an IP address, the CNAME tells DNS to look up another domain first.

CNAME records are commonly used for:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare
- Custom domains

For example, if someone connects:

```
www.bilalhussain.com
```

to

```
bilal-hussain.netlify.app
```

a CNAME record is usually used.

---

# What Happens When Someone Opens a Website?

Suppose a user types:

```
www.example.com
```

inside the browser.

The DNS lookup process follows these steps:

## Step 1 — Browser Request

The user enters the website address.

```
www.example.com
```

The browser first checks whether it already knows the IP address from its local cache.

If it is cached, the website opens immediately.

Otherwise, the browser starts a DNS lookup.

---

## Step 2 — DNS Resolver

The request is sent to a DNS Resolver.

A DNS Resolver acts like a helper that finds the correct IP address for the requested website.

Usually, the resolver belongs to:

- Internet Service Provider (ISP)
- Google DNS
- Cloudflare DNS

---

## Step 3 — Root Name Server

If the resolver doesn't know the answer, it asks the Root Name Server.

The root server does not know the website's IP address.

Instead, it tells the resolver which Top-Level Domain (TLD) server should be asked next.

Example:

```
.com
.org
.net
.pk
```

---

## Step 4 — TLD Name Server

The resolver now contacts the TLD server.

If the website is:

```
example.com
```

the resolver asks the ".com" TLD server.

The TLD server replies with the location of the website's Authoritative Name Server.

---

## Step 5 — Authoritative Name Server

This is the final source of information.

The Authoritative Name Server stores the actual DNS records of the domain.

It returns the requested IP address.

Example:

```
www.example.com

↓

93.184.216.34
```

---

## Step 6 — Response

The resolver sends the IP address back to the browser.

The browser now knows where the website is located.

---

## Step 7 — Website Loads

The browser sends an HTTP or HTTPS request to that IP address.

The web server responds with:

- HTML
- CSS
- JavaScript
- Images
- Fonts
- Videos

The browser renders everything and displays the website.

---

# What is a Resolver?

A Resolver is the first DNS server that receives the user's request.

Its job is to find the correct IP address.

It communicates with multiple DNS servers until it finds the answer.

Think of it as someone searching for a phone number on your behalf.

---

# What is a Name Server?

A Name Server stores DNS information for a domain.

There are different types of Name Servers:

- Root Name Server
- TLD Name Server
- Authoritative Name Server

Each one helps guide the request until the correct IP address is found.

---

# What is a DNS Record?

A DNS Record stores information about a domain.

Common DNS records include:

| Record | Purpose                               |
| ------ | ------------------------------------- |
| A      | Maps a domain to an IPv4 address      |
| AAAA   | Maps a domain to an IPv6 address      |
| CNAME  | Points one domain to another domain   |
| MX     | Email server                          |
| TXT    | Verification and security information |
| NS     | Name server information               |

Each record has a different purpose.

---

# What is a DNS Response?

A DNS Response is the answer returned by the DNS system.

If everything is successful, the response contains:

- Domain Name
- IP Address
- Record Type
- TTL (Time To Live)

Example:

```
example.com

A Record

93.184.216.34
```

The browser uses this information to connect to the website.

---

# Simple DNS Flow

```
User
   │
   ▼
Browser
   │
   ▼
DNS Resolver
   │
   ▼
Root Name Server
   │
   ▼
TLD Name Server (.com)
   │
   ▼
Authoritative Name Server
   │
   ▼
IP Address Returned
   │
   ▼
Browser Connects to Server
   │
   ▼
Website Opens
```

---

# Conclusion

DNS is an essential part of the Internet because it converts human-friendly domain names into IP addresses that computers understand.

When a user enters a website address, the DNS Resolver communicates with the Root Server, TLD Server, and Authoritative Name Server to find the correct IP address. Once the IP address is returned, the browser connects to the web server and loads the requested website.

DNS records, including A, AAAA, CNAME, MX, TXT, and NS records, help direct Internet traffic efficiently. Understanding DNS provides a solid foundation for deploying websites, configuring custom domains, and managing web infrastructure.
