package foodscooter.repositories.specifications;

import foodscooter.model.Order;
import foodscooter.model.rider.FullTimeSchedule;
import foodscooter.model.rider.PartTimeShift;
import foodscooter.model.rider.RiderType;
import foodscooter.model.users.Rider;

import java.util.List;

public interface RidersRepository {
  void add(RiderType riderType);
  List<Rider> getAll();
  boolean checkFullTime(int drid);
  boolean checkPartTime(int drid);
  FullTimeSchedule getFullTimeSchedule(int drid);
  List<PartTimeShift> getPartTimeShift(int drid);
  List<Order> getFullTimeOrders(String dayOption, String shift1, String shift2);
  List<Order> getPartTimeOrders(String sqlQuery, Object[] objectArr);
  List<Order> getOrderSummary(int drid);
  List<Order> getAcceptedOrders(int drid);
  void acceptedOrder(int drid, int oid);
}
