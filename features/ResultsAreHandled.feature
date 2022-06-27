Feature: Results are processed correctly
  As build results come in
  They should be processed correctly
  So we know who broke the build

  The concept of poopsmithing is when you break the build and then fix it.
  It's a dirty job sure, but it's your own crap so you don't get extra credit.
  The true praise is reserved for others who step up and fix your crap.

  Scenario: No update when currently broken and tests fail
    Given the build status is currently BORKD by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was unsuccessful
    When the build run posts it's results
    Then the build status is BORKD by "Dave" at 02:00 PM

  Scenario: No update when currently fixed and tests pass
    Given the build status is currently FIXED by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Dave" at 02:00 PM

  Scenario: No update when currently poopsmithed and tests pass
    Given the build status is currently POOPSMITH by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is POOPSMITH by "Dave" at 02:00 PM

  Scenario: Change to fixed when currently broken
    Given the build status is currently BORKD by "Dave" at 2:00 PM
    And the build run by "Aaron" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is FIXED by "Aaron" at 03:06 PM

  Scenario: Change to poopsmithed when currently broken
    Given the build status is currently BORKD by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was successful
    When the build run posts it's results
    Then the build status is POOPSMITH by "Dave" at 03:06 PM

  Scenario: Change to broken when currently fixed
    Given the build status is currently FIXED by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was unsuccessful
    When the build run posts it's results
    Then the build status is BORKD by "Dave" at 03:06 PM

  Scenario: Change to broken when currently poopsmithed
    Given the build status is currently POOPSMITH by "Dave" at 2:00 PM
    And the build run by "Dave" at 3:06 PM was unsuccessful
    When the build run posts it's results
    Then the build status is BORKD by "Dave" at 03:06 PM
