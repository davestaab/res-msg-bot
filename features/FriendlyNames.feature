Feature: Users unique names are translated to a friendly name
  As build results come in,
  They should use friendly names
  so that emails or uids aren't revealed

  Background: Name mapping structure
    Given the friendly name mapping is:
    """
    {
      "CMPY\\\\dvy": "Dave",
      "staabdr@cmpy.com": "Dave",
      "CMPY\\\\tnr": "Shannon"
    }
    """

  Scenario: Unique Names are mapped to friendly names
    Given the build status is currently BORKD by "Aaron" at 2:00 PM for branch "release/lead-leopard"
    And the build run by "CMPY\\dvy" for branch "release/lead-leopard" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status should be FIXED by "Dave" at 3:06 PM for branch "release/lead-leopard"

  Scenario: Multiple unique names can be mapped
    Given the build status is currently BORKD by "Aaron" at 2:00 PM for branch "release/lead-leopard"
    And the build run by "staabdr@cmpy.com" for branch "release/lead-leopard" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status should be FIXED by "Dave" at 3:06 PM for branch "release/lead-leopard"

  Scenario: Unique name is used if there's no match
    Given the build status is currently BORKD by "Aaron" at 2:00 PM for branch "release/lead-leopard"
    And the build run by "someone@new.com" for branch "release/lead-leopard" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status should be FIXED by "someone@new.com" at 3:06 PM for branch "release/lead-leopard"
