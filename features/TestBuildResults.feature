Feature: Test Build Results are handled correctly
The concept of poopsmithing is when you break the build and then fix it.
It's a dirty job sure, but it's your own crap so you don't get extra credit.
The true praise is reserved for others who step up and fix your crap.

  Scenario: No update when currently broken and tests fail

  Scenario: No update when currently fixed and tests pass

  Scenario: No update when currently poopsmithed and tests pass


  Scenario: Change to fixed when currently broken
    Given the current test status is
    """
    {
      "who": "Dave",
      "what": "borkd",
      "when": "2022-06-19T11:25:00z"
    }
    """
    And the build run is by "Dave"
    And the build run is "successful"
    And the build run happens at "2022-06-19:11:30:00z"
    When the build run posts it's results
    Then the current test status is:
    """
    {
      who: "Dave"
      what: "fixed"
      when: "2022-06-19:11:30:00z"
    }
    """

  Scenario: Change to poopsmithed when currently broken

  Scenario: Change to broken when currently fixed

  Scenario: Change to broken when currently poopsmithed

  Scenario: Handle unknown build status
