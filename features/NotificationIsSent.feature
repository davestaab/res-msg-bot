Feature: A notification is sent about current build results
As build results come in
A message is sent to the team
So everyone knows what the status of the last test run is

  Background: Name mapping structure
    Given the friendly name mapping is:
      """
      {
        "CMPY\\dvy": "Dave",
        "lastdr@cmpy.com": "Dave",
        "CMPY\\tnr": "Shannon"
      }
      """

  Scenario: Latest build results are sent to the team for a successful build
    Given the build run by "dave" for branch "release/lead-leopard" at 02:00 PM was successful
    When the build run posts it's results
    Then the team should be notified with a message:
      ```
      {
        "embeds": [
          {
            "title": "Latest Test run passed!",
            "color": 5612386,
            "description": "🌞 Tests on `release/lead-leopard` passed!\n\n🥇 Congrats **dave** on a job well done!"
          }
        ]
      }
      ```

  Scenario: Latest build results are sent to the team for a failed build
    Given the build run by "dave" for branch "release/lead-leopard" at 02:00 PM was unsuccessful
    When the build run posts it's results
    Then the team should be notified with a message:
      ```
      {
        "embeds": [
          {
            "title": "Latest Test run failed!",
            "color": 12649008,
            "description": "🌧 Tests on `release/lead-leopard` failed!\n\n🧹 I'm sorry **dave** but you should probably clean that up!"
          }
        ]
      }
      ```

  Scenario: Build results use friendly names
    Given the build run by "CMPY\dvy" for branch "release/lead-leopard" at 3:06 PM was successful
    When the build run posts it's results
    Then the team should be notified with a message:
      ```
       {
         "embeds": [
           {
             "title": "Latest Test run passed!",
             "color": 5612386,
             "description": "🌞 Tests on `release/lead-leopard` passed!\n\n🥇 Congrats **Dave** on a job well done!"
           }
         ]
       }
      ```
