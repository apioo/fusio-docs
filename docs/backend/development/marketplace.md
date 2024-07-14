---
sidebar_position: 4
---

# Marketplace

The marketplace allows you to install actions and apps from the Fusio marketplace. 

## Actions
Actions can help you to solve small specific tasks and they are also a great starting point to build different
actions. On installation the app is inserted to your local action directory which you can see at the API / Action panel.

## Apps

Apps are mostly small Javascript apps which work with the Fusio API. I.e. the Fusio backend and developer portal app is
also distributed through the marketplace. On installation the marketplace downloads the app and puts them at the
`/public/apps/` folder.

## Contribute

If you are a developer and you want to provide an action or app to the marketplace you can register at our
[Marketplace](https://marketplace.fusio-project.org/) app and there you can create new actions or apps. Then you can
publish those actions or apps so that they are visible at every local Fusio installation.

## Configuration

It is possible to disable the complete marketplace through the `APP_MARKETPLACE` env setting.
