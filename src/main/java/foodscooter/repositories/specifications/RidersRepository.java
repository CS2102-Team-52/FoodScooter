package foodscooter.repositories.specifications;

import foodscooter.model.orders.Order;
import foodscooter.model.users.rider.FullTimeSchedule;
import foodscooter.model.users.rider.PartTimeShift;
import foodscooter.model.users.rider.SalaryInfo;
import foodscooter.model.users.rider.Rider;

import java.util.List;

public interface RidersRepository {
  List<Rider> getAll();
  boolean checkFullTime(int drid);
  boolean checkPartTime(int drid);
  FullTimeSchedule getFullTimeSchedule(int drid);
  List<PartTimeShift> getPartTimeShift(int drid);
  List<Order> getFullTimeOrders(String dayOption, String shift1, String shift2);
  List<Order> getPartTimeOrders(String sqlQuery, Object[] objectArr);
  List<Order> getOrderSummary(int drid);
  List<Order> getAcceptedOrders(int drid);
  void acceptOrder(int drid, int oid);
  void doneOrder(int drid, int oid);
  int getBaseSalary(int drid);
  SalaryInfo getSummaryCurrentMonth(int drid, int baseSalary);
  SalaryInfo getSummaryCurrentWeek(int drid, int baseSalary);
}
