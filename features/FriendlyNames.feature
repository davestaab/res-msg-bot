Feature: Users unique names are translated to a friendly name
  As build results come in,
  They should use friendly names
  so that emails or uids aren't revealed

  Background: Name mapping structure
    Given the friendly name mapping is:
    """
    {
      "ORNL\\\\i47": "Dave",
      "staabdr@ornl.gov": "Dave",
      "ORNL\\\\8pt": "Shannon"
    }
    """

  Scenario: Unique Names are mapped to friendly names
    Given the build status is currently BORKD by "Aaron" at 2:00 PM
    And the build run by "ORNL\\i47" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Dave" at 3:06 PM

  Scenario: Multiple unique names can be mapped
    Given the build status is currently BORKD by "Aaron" at 2:00 PM
    And the build run by "staabdr@ornl.gov" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Dave" at 3:06 PM

  Scenario: Unique name is used if there's no match
    Given the build status is currently BORKD by "Aaron" at 2:00 PM
    And the build run by "someone@new.com" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "someone@new.com" at 3:06 PM
