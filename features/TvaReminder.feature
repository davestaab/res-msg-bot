Feature: A Reminder to submit time is posted to
  When the script is run,
  a message should be sent to the team to submit their time
  so they are not hounded by the time variance authority

  Scenario: A message is sent
    When a time reminder is requested
    Then the time reminder has content
    And the time reminder embed title is "Don't forget...."
    And the time reminder embed description is:
    """
    Just a friendly reminder from the Time Variance Authority: Avoid a nexus event and enter your time! We can all do our part to protect and preserve the Sacred Timeline.
    
    -- The Time-Keepers
    """
    And the time reminder embed has an image