package foodscooter.repositories.specifications;

import java.util.List;

import foodscooter.model.summaries.CustomerSummary;
import foodscooter.model.summaries.GeneralSummary;
import foodscooter.model.summaries.LocationSummary;
import foodscooter.model.summaries.PromotionSummary;
import foodscooter.model.summaries.RestaurantSummary;
import foodscooter.model.summaries.RiderSummary;

/**
 * Support the browsing of summary information for FDS managers. The summary information could include the following:
 */
public interface SummaryRepository {

  // ---------- FDS Manager Summaries ----------

  /**
   * 1. For each month, the total number of new customers, the total number of orders, and the total cost of all
   * orders.
   */
  List<GeneralSummary> getGeneralSummary();

  /**
   * 2. For each month and for each customer who has placed some order for that month, the total
   * number of orders placed by the customer for that month and the total cost of all these orders.
   */
  List<CustomerSummary> getCustomerSummary();

  /**
   * 3. For each hour and for each delivery location area, the total number of orders placed at that
   * hour for that location area.
   */
  List<LocationSummary> getLocationSummary();

  /**
   * 4. For each rider and for each month, the total number of orders delivered by the rider for that
   * month, the total number of hours worked by the rider for that month, the total salary earned
   * by the rider for that month, the average delivery time by the rider for that month, the number
   * of ratings received by the rider for all the orders delivered for that month, and the average
   * rating received by the rider for all the orders delivered for that month.
   */
  List<RiderSummary> getRiderSummary();

  // ---------- Restaurant Staff Summaries ----------

  /**
   * 1. For each month, the total number of completed orders, the total cost of all completed orders
   * (excluding delivery fees), and the top 5 favorite food items (in terms of the number of orders
   * for that item).
   */
  List<RestaurantSummary> getRestaurantSummary(int rid);

  /**
   * 2. For each promotional campaign, the duration (in terms of the number of days/hours) of the
   * campaign, and the average number of orders received during the promotion (i.e., the ratio of
   * the total number of orders received during the campaign duration to the number of days/hours
   * in the campaign duration).
   */
  List<PromotionSummary> getPromotionSummary(int rid);
}
