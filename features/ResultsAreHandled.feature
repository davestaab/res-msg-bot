Feature: Results are processed correctly
  As build results come in
  They should be processed correctly
  So we know who broke the build

  The concept of poopsmithing is when you break the build and then fix it.
  It's a dirty job sure, but it's your own crap so you don't get extra credit.
  The true praise is reserved for others who step up and fix your crap.

  Scenario: No update when currently broken and tests fail

  Scenario: No update when currently fixed and tests pass

  Scenario: No update when currently poopsmithed and tests pass

  Scenario: Change to fixed when currently broken
    Given the build status is currently BORKD by "Dave" at 2:00 PM
    And the build run by "Aaron" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Aaron" at 03:06 PM

  Scenario: Change to poopsmithed when currently broken

  Scenario: Change to broken when currently fixed

  Scenario: Change to broken when currently poopsmithed

  Scenario: Handle unknown build status
    Unknown build status should be treated as a failure.
    It's probably a partial success or problem on the biuld server.
