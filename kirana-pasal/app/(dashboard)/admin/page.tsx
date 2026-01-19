"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import axios from "axios"

export const description = "A bar chart with a label"

const chartData = []

const chartConfig = {
  quantity: {
    label: "quantity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ChartBarLabel() {

  const [chartData, setChartData] = useState([])

  const fetchdata = async () => {
    const { data } = await axios.get("http://localhost:4000/products")

    const groupedData = Object.values(
      data.reduce((acc, item) => {
        const category = item.Category

        if (!acc[category]) {
          acc[category] = {
            category: category,
            quantity: 0
          }
        }

        acc[category].quantity += 1
        return acc
      }, {})
    )


    setChartData(groupedData)
  }

  useEffect(() => {
    fetchdata()

  }, [])

  return (
    <Card className="h-70 w-70 shadow-xl ">
      <CardHeader>
        <CardTitle>Product vs Quantity sale</CardTitle>
        <CardDescription>All time </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this category <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total quantity for the last 6 categorys
        </div>
      </CardFooter>
    </Card>
  )
}
