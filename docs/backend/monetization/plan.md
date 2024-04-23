---
sidebar_position: 1
---

# Plan

A plan can be purchased by a user to obtain points. Those points can then be used to call specific API endpoints. At the
backend it is possible to set a specific cost for each route. Every plan has a name, description, price and points. The
developer app contains already a possibility to buy those plans.

## Configuration

![plan_create](/img/backend/monetization/plan_create.png)

### Name

The name of the plan.

### Description

A short description of the plan.

### Price

The price of this plan.

### Points

The amount of points a user obtains if he purchases this plan.

### Period

The period of this plan, this is either one-time or subscription.

### External-Id

Optional an external id, for Stripe this is the price id.

## Setup

To enable payments you need to setup a payment provider (i.e. stripe). Through the payment provider the user can
purchase such plans. For more information please take a look at our [setup monetization](../../use_cases/api_product/setup_monetization.md)
guide.
