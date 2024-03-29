Feature: Build history is captured
  As build results come in
  a history of builds is captured
  so we can know how well the build is doing over time

  Currently disabling the build history in favor of tracking by branches and 
  posting a summmary of build statuses to discord.

  # Scenario: Current status is captured when a new status comes in
  #   Given the build history is empty
  #   And the build status is currently BORKD by "Dave" at 02:00 PM for branch "release/lead-leopard" with a count of 2
  #   And the build run by "Aaron" for branch "release/lead-leopard" at 3:06 PM was successful
  #   When the build run posts it's results
  #   Then the build history should be:
  #     | what  | who  | when    | count |
  #     | BORKD | Dave | 2:00 PM |     2 |
  #   And the build status should be FIXED by "Aaron" at 03:06 PM for branch "release/lead-leopard" with a count of 1

  # Scenario: History is not destroyed by updates
  #   Given the current build history is:
  #     | what  | who   | when    | count |
  #     | BORKD | Dave  | 2:00 PM |     3 |
  #     | FIXED | Aaron | 2:15 PM |     2 |
  #   And the build status is currently BORKD by "Shannon" at 03:00 PM for branch "release/lead-leopard" with a count of 4
  #   And the build run by "Dave" for branch "release/lead-leopard" at 3:06 PM was successful
  #   When the build run posts it's results
  #   Then the build history should be:
  #     | what  | who     | when    | count |
  #     | BORKD | Dave    | 2:00 PM |     3 |
  #     | FIXED | Aaron   | 2:15 PM |     2 |
  #     | BORKD | Shannon | 3:00 PM |     4 |
  #   And the build status should be FIXED by "Dave" at 03:06 PM for branch "release/lead-leopard" with a count of 1

  # Scenario: History is not saved when just the count is updated
  #   Given the current build history is:
  #     | what  | who  | when    | count |
  #     | BORKD | Dave | 2:00 PM |     5 |
  #   And the build status is currently FIXED by "Aaron" at 2:15 PM for branch "release/lead-leopard" with a count of 2
  #   And the build run by "Dave" for branch "release/lead-leopard" at 3:06 PM was successful
  #   When the build run posts it's results
  #   Then the build status should be FIXED by "Aaron" at 2:15 PM for branch "release/lead-leopard" with a count of 3
  #   And the build history should be:
  #     | what  | who  | when    | count |
  #     | BORKD | Dave | 2:00 PM |     5 |
