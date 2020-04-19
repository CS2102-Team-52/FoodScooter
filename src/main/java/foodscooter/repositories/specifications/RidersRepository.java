package foodscooter.repositories.specifications;

import foodscooter.model.orders.Order;
import foodscooter.model.users.rider.RiderFullTimeSchedule;
import foodscooter.model.users.rider.RiderPartTimeShift;
import foodscooter.model.users.rider.SalaryInfo;
import foodscooter.model.users.rider.Rider;

import java.util.List;

public interface RidersRepository {
  List<Rider> getAll();
  boolean checkFullTime(int drid);
  boolean checkPartTime(int drid);
  List<Order> getFullTimeOrders(int drid);
  List<Order> getPartTimeOrders(int drid);
  List<Order> getOrderSummary(int drid);
  List<Order> getAcceptedOrders(int drid);
  void acceptOrder(int drid, int oid);
  void doneOrder(int drid, int oid);
  int getBaseSalary(int drid);
  SalaryInfo getSummaryCurrentMonth(int drid, int baseSalary);
  SalaryInfo getSummaryCurrentWeek(int drid, int baseSalary);
  RiderFullTimeSchedule getRiderFullTimeSchedule(int drid);
  void updateRiderFullTimeSchedule(int drid, RiderFullTimeSchedule riderFullTimeSchedule);
  void updateRider(int drid, int salary);
  void addFullTimeRider(int drid);
  void addPartTimeShift(int drid, RiderPartTimeShift riderPartTimeShift);
  void deletePartTimeShift(int drid, int ptsid);
  List<RiderPartTimeShift> getRiderPartTimeShift(int drid);
}
