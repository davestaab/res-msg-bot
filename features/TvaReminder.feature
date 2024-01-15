Feature: A Reminder to submit time is posted to
  When the script is run,
  a message should be sent to the team to submit their time
  so they are not hounded by the time variance authority

  Scenario: A message is sent
    Have to set the day as a non holiday or this fails when working on a holiday.
    
    Given today is "2024-01-10"
    When a time reminder is requested
    Then the time reminder should have content
    And the time reminder embed title should be "Don't forget...."
    And the time reminder embed description should be:
    """
    Just a friendly reminder from the Time Variance Authority: Avoid a nexus event and enter your time! We can all do our part to protect and preserve the Sacred Timeline.
    
    -- The Time-Keepers
    """
    And the time reminder embed should have an image

  Scenario: A message is not sent on a holiday
    Given the holidays are:
      | date       | name       |
      |2023-12-25  | Christmas  |
    And today is "2023-12-25"
    When a time reminder is requested
    Then the time reminder content should be:
      """
      Special announcement from the TVA... It's Christmas!

      No need to enter your time today.
      Unless of course you're billing a project but you shouldn't be doing that.

      Enjoy the time off!!
      """