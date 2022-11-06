---
sidebar_position: 1
---

# Plan

A plan can be purchased by a user to obtain points. Those points can then be used to call specific API endpoints. At the
backend it is possible to set a specific cost for each route. Every plan has a name, description, price and points. The
developer app contains already a possibility to buy those plans.

![rate_create](/img/backend/monetization/plan.png)

To enable payments you need to setup a payment provider (i.e. stripe). Through the payment provider the user can
purchase such plans. For more information please take a look at our [setup monetization](../../use_cases/setup_monetization.md)
guide.
