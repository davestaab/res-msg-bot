Feature: The build id is captured
  As build results come in,
  the build id should be captured
  so the build that triggered the status can be captured

  Scenario: Build id is captured
    Given the build run had an id of "20210701.1"
    When the build run posts it's results
    Then the build status should have an id of "20210701.1"
