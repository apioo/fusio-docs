
# Util A/B Test

At this action you can configure two actions A and B. These actions are then called based on a provided distribution.
A distribution of 50 means that there is a 50% chance to invoke either action A or B. A distribution of 80 means that
there is an 80% chance to invoke action A and 20% to invoke action B. You can use this action i.e. if you want to test
a new action and you dont want to test that action on all users.

## Configuration

### Action A

The Action A to execute.

### Action B

The Action B to execute.

### Distribution

An integer describing the chance whether to call action A or B. A value of 50 means, that there is an equal chance to
call action A or B.
