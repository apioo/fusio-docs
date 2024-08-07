
# Util A/B Test

At this action you can configure two actions A and B. These actions are then called based on a provided distribution.
A distribution of 50 means that there is a 50% chance to invoke either action A or B. A distribution of 80 means that
there is an 80% chance to invoke action A and 20% to invoke action B. You can use this action i.e. if you want to test
a new action and you dont want to test that action on all users.

## Configuration

![util_ab_test](/img/backend/api/action/util_ab_test.png)

### Action A

The Action A to execute.

### Action B

The Action B to execute.

### Distribution

An integer describing the chance whether to call action A or B. A value of 50 means, that there is an equal chance to
call action A or B.

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/8ETZv2YeL_A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
